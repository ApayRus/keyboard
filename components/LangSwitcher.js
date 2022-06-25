const LangSwitcher = {
	template: `
    <div class="langSwitcher">
        <div 
            v-for="lang in langs" 
            class="lang"
        >
            {{lang}}
        </div>
    </div>`,
	/* add: */
	props: {
		langs: Array
	}
}

export default LangSwitcher
