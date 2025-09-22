import { getKeyLabels } from '../utils.js'

const Key = {
	template: `
    <div
		:class="[
					'key', 
					keyContent.code, 
					{ held: isHeld }
				]"
			@click="keyClick(keyContent)"
			@mousedown.prevent="onMouseDown(keyContent)"
			@mouseup.prevent="onMouseUp(keyContent)"
			@mouseleave.prevent="onMouseLeave(keyContent)"
	>
		<div v-if="isActive" :class="['key', 'active', keyContent.code]">
			<div>{{value}}</div>
		</div>
		<div class="main">{{main}}</div>
		<div class="shifted">{{shifted}}</div>
	</div>`,
	props: {
		keyContent: Object,
		activeKey: Object,
		setActiveKey: Function,
		// add:
		playKey: Function,
		toggleShiftKey: Function,
		shiftKey: Boolean,
		heldMap: Object,
		holdKey: Function,
		releaseKey: Function,
		demoEnabled: Boolean
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
		},
		isHeld() {
			return !!this.heldMap[this.keyContent.code]
		},
		value() {
			const { main, shifted, code } = this.keyContent
			return (this.shiftKey ? shifted : main) || code
		}
	},
	methods: {
		onMouseDown(keyContent) {
			this.holdKey(keyContent)
			if (this.demoEnabled) {
				this.playKey(keyContent)
			}
			if (keyContent.code.includes('Shift')) {
				this.toggleShiftKey()
			}
		},
		onMouseUp(keyContent) {
			this.releaseKey(keyContent)
		},
		onMouseLeave(keyContent) {
			/* if user drags out while held, release without animation */
			if (this.isHeld) {
				this.releaseKey({ code: keyContent.code })
			}
		},
		keyClick(keyContent) {
			/* animate and play sound only when demo is enabled */
			if (this.demoEnabled) {
				this.setActiveKey(keyContent)
				this.playKey(keyContent)
			}

			if (keyContent.code.includes('Shift')) {
				this.toggleShiftKey()
			}
		}
	}
}

export default Key
