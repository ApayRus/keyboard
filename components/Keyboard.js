import Key from './Key.js'

const Keyboard = {
	template: `<div class="keyboard">
                    Keyboard
                    <vue-key />
                    <vue-key />
                    <vue-key />
                </div>`,
	components: {
		'vue-key': Key
	}
}

export default Keyboard
