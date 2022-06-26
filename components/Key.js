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
				{active: activeKey.code === keyContent.code}
				]"
	>
	<div class="main">{{main}}</div>
	<div class="shifted">{{shifted}}</div>
</div>`,
	props: {
		keyContent: Object,
		activeKey: Object
	},
	computed: {
		main() {
			const { main } = getKeyLabels(this.keyContent)
			return main
		},
		shifted() {
			const { shifted } = getKeyLabels(this.keyContent)
			return shifted
		}
	}
}

export default Key
