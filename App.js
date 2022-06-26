import Keyboard from './components/Keyboard.js'
import LangSwitcher from './components/LangSwitcher.js'

const App = {
	template: `App-{{currentLang}}
	<vue-lang-switcher 
		:langs="langs" 
		:switchLang="switchLang" 
		:currentLang="currentLang" 
	/>
	<vue-keyboard :currentLang="currentLang" />
	`,
	components: {
		'vue-lang-switcher': LangSwitcher,
		'vue-keyboard': Keyboard
	},
	mounted() {
		import(`./keyboardData/en.js`).then(result => {
			const { default: keyboardData } = result
			this.keyboardData = keyboardData
		})
	},
	data() {
		return {
			langs: ['en', 'ru', 'ar'],
			/* add: */
			currentLang: 'en'
		}
	},
	/* add: */
	methods: {
		switchLang(lang) {
			this.currentLang = lang
		}
	}
}

export default App
