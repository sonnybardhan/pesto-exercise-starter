function rot13(code) {
	let sentence = '';

	for (let letter of code) {
		let letterCode = letter.charCodeAt(0);

		if (letterCode >= 78 && letterCode < 91) {
			let decodedLetter = String.fromCharCode(letterCode - 13);
			sentence += decodedLetter;
		} else if (letterCode > 64 && letterCode < 78) {
			let decodedLetter = String.fromCharCode(letterCode + 13);
			sentence += decodedLetter;
		} else {
			sentence += letter;
		}
	}
	return sentence;
}

export { rot13 };
