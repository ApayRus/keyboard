import Key from './Key.js'

const Keyboard = {
	template: `
	<div>activeKey: {{activeKey}}</div>
	<div>shiftKey: {{shiftKey}}</div>
	<div class="keyboard">
		<div
			v-for="(row, index) in keyboardData"
			:class="['row', 'row-'+(index+1)]"
		>
			<vue-key
				v-for="keyContent in row"
				:keyContent="keyContent" 
				:activeKey="activeKey" 
				:setActiveKey="setActiveKey" 
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
			this.getKeyboardData(currentLang)
		}
	},
	mounted() {
		this.getKeyboardData(this.currentLang)

		window.addEventListener('keydown', event => {
			event.preventDefault()
			const { code, shiftKey } = event
			const keyContent = this.keyboardData
				.flat()
				.find(elem => elem.code === code)
			this.setActiveKey(keyContent)
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
		async getKeyboardData(lang) {
			const { default: keyboardData } = await import(
				`../keyboardData/${lang}.js`
			)
			this.keyboardData = keyboardData
		},
		setActiveKey(keyContent) {
			this.activeKey = keyContent
			clearTimeout(this.timeout)
			this.timeout = setTimeout(() => (this.activeKey = { code: '' }), 1000)
		},
		toggleShiftKey() {
			this.shiftKey = !this.shiftKey
		}
	}
}

export default Keyboard
