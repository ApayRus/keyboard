import Key from './Key.js'
import { getAudioFileName, loadKeyboardData, playKeyAudio } from '../utils.js'

const Keyboard = {
	template: `
	<div>activeKey: {{activeKey}}</div>
	<div>shiftKey: {{shiftKey}}</div>
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
			shiftKey: false
		}
	},
	props: {
		currentLang: String
	},
	watch: {
		currentLang: function (currentLang) {
			this.setKeyboardData(currentLang)
		}
	},
	mounted() {
		this.setKeyboardData(this.currentLang)

		window.addEventListener('keydown', event => {
			event.preventDefault()
			const { code, shiftKey } = event

			const keyContent = this.getKeyContent(this.currentLang, code)

			this.setActiveKey(keyContent)
			this.playKey(keyContent)
		})

		window.addEventListener('keydown', event => {
			if (event.key === 'Shift') {
				this.shiftKey = true
			}
		})

		window.addEventListener('keyup', event => {
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
		playKey(keyContent) {
			const { code } = keyContent
			const { shiftKey, currentLang } = this

			playKeyAudio(currentLang, keyContent, shiftKey).catch(() => {
				// fallback
				if (this.currentLang !== 'en') {
					const keyContent = this.getKeyContent('en', code)
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
