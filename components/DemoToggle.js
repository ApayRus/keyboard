const DemoToggle = {
	template: `
	<div 
		class="demoToggle"
		:class="{ active: enabled }"
		@click="toggle()"
		title="демонстрация клавиш"
	>
		<svg width="16" height="16" viewBox="0 0 24 24" aria-hidden="true" focusable="false">
			<path d="M3 9v6h4l5 5V4L7 9H3z" fill="currentColor"/>
		</svg>
	</div>
	`,
	props: {
		enabled: Boolean,
		toggle: Function
	}
}

export default DemoToggle
