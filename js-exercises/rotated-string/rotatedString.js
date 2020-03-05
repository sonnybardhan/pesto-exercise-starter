const rotatedString = (str1, str2) => {
	if (str1.length !== str2.length) return false;
	if (str1 === str2) return false;

	for (let letter of str2) {
		const prevCharStr1 = returnPreviousChar(str1, letter);
		const nextCharStr1 = returnNextChar(str1, letter);

		if (!prevCharStr1 || !nextCharStr1) return false;

		const prevCharStr2 = returnPreviousChar(str2, letter);
		const nextCharStr2 = returnNextChar(str2, letter);

		if (prevCharStr1 !== prevCharStr2 || nextCharStr1 !== nextCharStr2) return false;
	}

	return true;
};

function returnPreviousChar(string, char) {
	const charIndex = string.split('').findIndex((letter) => letter === char);
	if (charIndex < 0) return false;

	let previousIndex = charIndex - 1;
	if (previousIndex < 0) {
		previousIndex = string.length - 1;
	}
	return string[previousIndex];
}

function returnNextChar(string, char) {
	const charIndex = string.split('').findIndex((letter) => letter === char);
	if (charIndex < 0) return false;

	let nextIndex = charIndex + 1;
	if (nextIndex >= string.length) {
		nextIndex = 0;
	}
	return string[nextIndex];
}

export { rotatedString };
