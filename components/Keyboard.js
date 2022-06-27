import Key from './Key.js'

const getAudioFileName = (keyContent, shiftKey) => {
	const { main, mainName, shifted, shiftedName, code } = keyContent

	let fileName

	if (shiftKey) {
		// will be returned 1 of 3 values (if it exist). priority to the first one
		fileName = shiftedName || shifted || code
	} else {
		fileName = mainName || main || code
	}

	// to have a guarantee, that everything is written in the same (lower) case
	return fileName.toLowerCase()
}

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
			/* add: */
			const fileName = getAudioFileName(keyContent, this.shiftKey)
			const audio = new Audio(
				`./keyboardData/${this.currentLang}/${fileName}.mp3`
			)
			audio.play()
			//
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
