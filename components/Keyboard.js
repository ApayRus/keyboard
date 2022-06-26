import Key from './Key.js'

const Keyboard = {
	template: `
	<div class="keyboard">
		<div
			v-for="(row, index) in keyboardData"
			:class="['row', 'row-'+(index+1)]"
		>
			<vue-key
				v-for="keyContent in row"
				:keyContent="keyContent"
			/>
		</div>
	</div>
`,
	components: {
		'vue-key': Key
	},
	data() {
		return { keyboardData: [] }
	},
	/* receive a new prop  */
	props: {
		currentLang: String
	},
	watch: {
		/* add function, that will be called when prop changes */
		currentLang: function (currentLang) {
			this.getKeyboardData(currentLang)
		}
	},
	/* happens when app opened for the first time */
	mounted() {
		this.getKeyboardData(this.currentLang)
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
