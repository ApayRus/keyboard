import Key from './Key.js'
import { loadKeyboardData, playKeyAudio, getKeyContent } from '../utils.js'

const Keyboard = {
	template: `
	<div class="keyboard">
		<div
			v-for="(row, index) in keyboardData[currentLang]"
			:class="['row', 'row-'+(index+1)]"
		>
			<vue-key
				v-for="keyContent in row"
				:keyContent="keyContent" 
				:activeKey="activeKey" 
				:setActiveKey="setActiveKey" 
				:playKey="playKey"
				:toggleShiftKey="toggleShiftKey" 
				:shiftKey="shiftKey" 
				:heldMap="heldMap"
				:holdKey="holdKey"
				:releaseKey="releaseKey"
				:demoEnabled="demoEnabled"
			/>
		</div>
	</div>`,
	components: {
		'vue-key': Key
	},
	data() {
		return {
			keyboardData: [],
			activeKey: { code: '' },
			/* add: */
			shiftKey: false,
			/* held state for pressed keys */
			heldMap: {}
		}
	},
	props: {
		currentLang: String,
		demoEnabled: Boolean,
		langs: Array
	},
	watch: {
		currentLang: function (currentLang) {
			this.setKeyboardData(currentLang)
		}
	},
	mounted() {
		/* Preload all layouts */
		Promise.all(this.langs.map(lang => this.setKeyboardData(lang))).then(
			() => {}
		)

		window.addEventListener('keydown', event => {
			event.preventDefault()
			const { code } = event
			const keyboardData = this.keyboardData[this.currentLang]
			const keyContent = getKeyContent({ keyboardData, code })
			/* mark as held; do not trigger animation while held */
			this.holdKey(keyContent)
			/* keep sound on press if demo is enabled */
			if (this.demoEnabled) {
				this.playKey(keyContent)
			}
		})

		window.addEventListener('keydown', event => {
			if (event.key === 'Shift') {
				this.shiftKey = true
			}
		})

		window.addEventListener('keyup', event => {
			const { code } = event
			const keyboardData = this.keyboardData[this.currentLang]
			const keyContent = getKeyContent({ keyboardData, code })
			/* release held and trigger animation on release (if enabled) */
			this.releaseKey(keyContent)
			if (event.key === 'Shift') {
				this.shiftKey = false
			}
		})
	},

	methods: {
		async setKeyboardData(lang) {
			this.keyboardData[lang] = await loadKeyboardData(lang)
		},
		getKeyContent(lang, code) {
			return this.keyboardData[lang].flat().find(elem => elem.code === code)
		},
		setActiveKey(keyContent) {
			this.activeKey = keyContent
			clearTimeout(this.timeout)
			this.timeout = setTimeout(() => (this.activeKey = { code: '' }), 1000)
		},
		holdKey(keyContent) {
			if (!keyContent || !keyContent.code) return
			this.heldMap = { ...this.heldMap, [keyContent.code]: true }
		},
		releaseKey(keyContent) {
			if (!keyContent || !keyContent.code) return
			const { [keyContent.code]: _removed, ...rest } = this.heldMap
			this.heldMap = rest
			/* trigger animation on release only when demo is enabled */
			if (this.demoEnabled) {
				this.setActiveKey(keyContent)
			}
		},
		playKey(keyContent) {
			const { code } = keyContent
			const { shiftKey, currentLang } = this

			playKeyAudio(currentLang, keyContent, shiftKey).catch(() => {
				// fallback
				if (this.currentLang !== 'en') {
					/* replace: 
					const keyContent = this.getKeyContent('en', code)
					with next 2 lines */
					const keyboardData = this.keyboardData['en']
					const keyContent = getKeyContent({ keyboardData, code })
					playKeyAudio('en', keyContent, shiftKey)
				}
			})
		},
		toggleShiftKey() {
			this.shiftKey = !this.shiftKey
		}
	}
}

export default Keyboard
