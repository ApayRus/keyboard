import LangSwitcher from './components/LangSwitcher.js'
import Keyboard from './components/Keyboard.js'

const App = {
	template: `App 
	<vue-lang-switcher />
	<vue-keyboard />
	`,
	components: {
		'vue-lang-switcher': LangSwitcher,
		'vue-keyboard': Keyboard
	}
}

export default App
