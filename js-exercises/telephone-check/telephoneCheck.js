function telephoneCheck(number) {
	if (number.length < 10) return false;
	if (number.length > 16) return false;

	// if(number[0] === 1 && number.length > 10 );

	if (number.length === 10) {
		if (typeAllNumbers(number)) return true;
	}
	if (number.length === 12) {
		if (typeHyphens(number)) return true;
	}
	if (number.length === 12) {
		if (typeSpaces(number)) return true;
	}
	if (number.length === 13) {
		if (typeParenHyphen(number)) return true;
	}
	if (number.length === 14) {
		if (typeParenSpaceHyphen(number)) return true;
	}
	if (number.length === 16) {
		if (typeOneSpacesParens(number)) return true;
	}

	return false;
}

function typeAllNumbers(numbers) {
	//10
	for (let number of numbers) {
		if (isNaN(parseInt(number))) return false;
	}
	return true;
}

function typeHyphens(numberString) {
	//12
	if (numberString[3] !== '-' || numberString[7] !== '-') return false;

	for (let i = 0; i < numberString.length; i++) {
		const char = parseInt(numberString[i]);
		if (i !== 3 && i !== 7 && isNaN(char)) return false;
	}
	return true;
}

function typeSpaces(numberString) {
	//12
	if (numberString[3] !== ' ' || numberString[7] !== ' ') return false;

	for (let i = 0; i < numberString.length; i++) {
		const char = parseInt(numberString[i]);
		if (i !== 3 && i !== 7 && isNaN(char)) return false;
	}
	return true;
}

function typeParenHyphen(numberString) {
	//13
	if (numberString[0] !== '(' || numberString[4] !== ')' || numberString[8] !== '-') return false;

	for (let i = 0; i < numberString.length; i++) {
		const char = parseInt(numberString[i]);
		if (i !== 0 && i !== 4 && i !== 8 && isNaN(char)) return false;
	}
	return true;
}

function typeParenSpaceHyphen(numberString) {
	//14
	if (numberString[0] !== '(' || numberString[4] !== ')' || numberString[5] !== ' ' || numberString[9] !== '-')
		return false;

	for (let i = 0; i < numberString.length; i++) {
		const char = parseInt(numberString[i]);
		if (i !== 0 && i !== 4 && i !== 5 && i !== 9 && isNaN(char)) return false;
	}
	return true;
}

function typeOneSpacesParens(numberString) {
	//16
	if (
		numberString[0] !== '1' ||
		numberString[1] !== ' ' ||
		numberString[2] !== '(' ||
		numberString[6] !== ')' ||
		numberString[7] !== ' ' ||
		numberString[11] !== '-'
	)
		return false;

	for (let i = 0; i < numberString.length; i++) {
		const char = parseInt(numberString[i]);
		if (i !== 0 && i !== 1 && i !== 2 && i !== 6 && i !== 7 && i !== 11 && isNaN(char)) return false;
	}
	return true;
}

export { telephoneCheck };
