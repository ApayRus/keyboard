const getKeyLabels = keyContent => {
	/*
	Code line below is called `destructuring`, 
	because we destructure an object `this.keyContent` 
	into 3 separate constants.
	*/
	const { main = '', shifted = '', label, code } = keyContent
	const isUpperCaseLang = main.toUpperCase() === shifted
	const mainOutput = isUpperCaseLang ? shifted : main
	const shiftedOutput = isUpperCaseLang ? '' : shifted

	return {
		/*
		|| is a logical `or` operator. 
		The line below is `or chain`. 
		If `label` exists, it will be returned. 
		If `label` doesn't exist, but `main` exists -- will be returned `main`. 
		If `label` and main don't exist, will be returned `code`.
		*/
		main: label || mainOutput || code,
		shifted: shiftedOutput
	}
}

const Key = {
	template: `
    <div
		:class="[
			'key', 
			keyContent.code, 
			{ active: isActive }, 
			{ shiftKeyPressed: isShift && shiftKey && !isActive }
		]"
		@click="keyClick(keyContent)"
	>
		<div class="main">{{main}}</div>
		<div class="shifted">{{shifted}}</div>
	</div>`,
	props: {
		keyContent: Object,
		activeKey: Object,
		setActiveKey: Function,
		toggleShiftKey: Function,
		shiftKey: Boolean
	},
	computed: {
		main() {
			const { main } = getKeyLabels(this.keyContent)
			return main
		},
		shifted() {
			const { shifted } = getKeyLabels(this.keyContent)
			return shifted
		},
		isActive() {
			return this.activeKey.code === this.keyContent.code
		},
		isShift() {
			return this.keyContent.code.includes('Shift')
		}
	},
	methods: {
		keyClick(keyContent) {
			this.setActiveKey(keyContent)
			if (keyContent.code.includes('Shift')) {
				this.toggleShiftKey()
			}
		}
	}
}

export default Key
