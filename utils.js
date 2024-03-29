export const getAudioFileName = (keyContent, shiftKey) => {
	const { main, mainName, shifted, shiftedName, code } = keyContent

	let fileName

	if (shiftKey) {
		// will be returned 1 of 3 values (if it exist). priority to the first one
		fileName = shiftedName || shifted || code
	} else {
		fileName = mainName || main || code
	}

	// to have a guarantee, that everything is written in the same (lower) case
	return fileName.toLowerCase()
}

export const getKeyLabels = keyContent => {
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

export const loadKeyboardData = async lang => {
	const { default: keyboardData } = await import(`../keyboardData/${lang}.js`)
	return keyboardData
}

export const playKeyAudio = (lang, keyContent, shiftKey) => {
	const fileName = getAudioFileName(keyContent, shiftKey)
	const audio = new Audio(`../keyboardData/sounds/${lang}/${fileName}.mp3`)
	return audio.play()
}

export const getKeyContent = ({ keyboardData, code = '', value = '' }) => {
	return keyboardData.flat().find(elem => {
		const { main, shifted } = elem
		return elem.code === code || value === main || value === shifted
	})
}
