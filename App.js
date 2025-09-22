import Keyboard from './components/Keyboard.js'
import LangSwitcher from './components/LangSwitcher.js'
import DemoToggle from './components/DemoToggle.js'

const App = {
	template: `
	<div class="topPanel">
		<vue-lang-switcher 
			:langs="langs" 
			:switchLang="switchLang" 
			:currentLang="currentLang" 
		/>
		<demo-toggle :enabled="demoEnabled" :toggle="toggleDemo" />
	</div>
	<vue-keyboard :currentLang="currentLang" :demoEnabled="demoEnabled" :langs="langs" />
	`,
	components: {
		'vue-lang-switcher': LangSwitcher,
		'vue-keyboard': Keyboard,
		'demo-toggle': DemoToggle
	},
	mounted() {},
	data() {
		return {
			langs: ['en', 'ru', 'ar'],
			/* add: */
			currentLang: 'en',
			/* demo toggle */
			demoEnabled: true
		}
	},
	/* add: */
	methods: {
		switchLang(lang) {
			this.currentLang = lang
		},
		toggleDemo() {
			this.demoEnabled = !this.demoEnabled
		}
	}
}

export default App
