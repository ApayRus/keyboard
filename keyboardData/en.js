const keyboard = [
	[
		{ code: 'Escape', label: 'Esc' },
		{ code: 'F1' },
		{ code: 'F2' },
		{ code: 'F3' },
		{ code: 'F4' },
		{ code: 'F5' },
		{ code: 'F6' }
	],
	[
		{
			code: 'Backquote',
			main: '`',
			shifted: '~'
		},
		{
			code: 'Digit1',
			main: '1',
			shifted: '!',
			shiftedName: 'exclamation mark'
		},
		{
			code: 'Digit2',
			main: '2',
			shifted: '@',
			shiftedName: 'at sign'
		},
		{
			code: 'Digit3',
			main: '3',
			shifted: '#',
			shiftedName: 'hash'
		},
		{
			code: 'Digit4',
			main: '4',
			shifted: '$',
			shiftedName: 'dollar sign'
		},
		{
			code: 'Digit5',
			main: '5',
			shifted: '%',
			shiftedName: 'percent sign'
		}
	],
	[
		{ code: 'Tab' },
		{
			code: 'KeyQ',
			main: 'q',
			shifted: 'Q'
		},
		{
			code: 'KeyW',
			main: 'w',
			shifted: 'W'
		},
		{
			code: 'KeyE',
			main: 'e',
			shifted: 'E'
		},
		{
			code: 'KeyR',
			main: 'r',
			shifted: 'R'
		}
	],
	[
		{
			code: 'ShiftLeft',
			label: 'Shift',
			mainName: 'left shift'
		},
		{
			code: 'ShiftRight',
			label: 'Shift',
			mainName: 'right shift'
		}
	]
]

export default keyboard
