const LangSwitcher = {
	template: `
	<div class="langSwitcher">
		<div 
			v-for="lang in langs" 
			:class='["lang", {active: currentLang === lang}]'
			@click="switchLang(lang)"
		>
			{{lang}}
		</div>
    </div>
	<div style="text-align: center;">
		{{currentLang}}
	</div>`,
	props: {
		langs: Array
	},
	/* add: */
	data() {
		return {
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

export default LangSwitcher
