import Key from './Key.js'
import keyboardData from '../keyboardData/en.js'

const Keyboard = {
	template: `
    <div class="keyboard">
        <div class="row row-1">
            <vue-key :keyContent="keyboardData[0][0]" />
            <vue-key :keyContent="keyboardData[0][1]" />
            <vue-key :keyContent="keyboardData[0][2]" />
            <vue-key :keyContent="keyboardData[0][3]" />
            <vue-key :keyContent="keyboardData[0][4]" />
            <vue-key :keyContent="keyboardData[0][5]" />
        </div>
        <div class="row row-2">
            <vue-key :keyContent="keyboardData[1][0]" />
            <vue-key :keyContent="keyboardData[1][1]" />
            <vue-key :keyContent="keyboardData[1][2]" />
            <vue-key :keyContent="keyboardData[1][3]" />
            <vue-key :keyContent="keyboardData[1][4]" />
            <vue-key :keyContent="keyboardData[1][5]" />
        </div>
        <div class="row row-3">
            <vue-key :keyContent="keyboardData[2][0]" />
            <vue-key :keyContent="keyboardData[2][1]" />
            <vue-key :keyContent="keyboardData[2][2]" />
            <vue-key :keyContent="keyboardData[2][3]" />
            <vue-key :keyContent="keyboardData[2][4]" />
        </div>
    </div>`,
	components: {
		'vue-key': Key
	},
	data() {
		return { keyboardData }
	}
}

export default Keyboard
