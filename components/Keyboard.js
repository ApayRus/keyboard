import Key from './Key.js'

const Keyboard = {
	template: `
	<div>activeKey: {{activeKey}}</div>
	<div class="keyboard">
		<div
			v-for="(row, index) in keyboardData"
			:class="['row', 'row-'+(index+1)]"
		>
			<vue-key
				v-for="keyContent in row"
				:keyContent="keyContent" 
				:activeKey="activeKey" 
			/>
		</div>
	</div>`,
	components: {
		'vue-key': Key
	},
	data() {
		return {
			keyboardData: [],
			/* add: */
			activeKey: { code: '' }
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
			/* add: (read particular props of event) */
			const { code, key, shiftKey } = event
			/* write event parts to the state: */
			this.activeKey = { code, key, shiftKey }
			/* if there was old timeout, we clear it*/
			clearTimeout(this.timeout)
			/* store a new timeout for the last pressed key */
			this.timeout = setTimeout(() => (this.activeKey = { code: '' }), 1000)
		})
	},

	methods: {
		async getKeyboardData(lang) {
			const { default: keyboardData } = await import(
				`../keyboardData/${lang}.js`
			)
			this.keyboardData = keyboardData
		}
	}
}

export default Keyboard
