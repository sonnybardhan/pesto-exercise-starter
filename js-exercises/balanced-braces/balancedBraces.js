function balancedBraces(string) {
	const braceArray = braceArrayGenerator(string);
	//first brace is open
	if (closing(braceArray[0])) {
		console.log('first brace is closed');
		return false;
	}
	//last brace is open
	if (opening(braceArray[braceArray.length - 1])) {
		console.log('last brace is open');
		return false;
	}
	//odd number of braces
	if (braceArray.length % 2 === 1) {
		console.log('odd number of braces');
		return false;
	}
	//unbalanced pairs
	if (!pairCheck(braceArray)) {
		console.log('unbalanced pairs');
		return false;
	}

	for (let i = 0; i < braceArray.length; i++) {
		const brace = braceArray[i];
		if (opening(brace)) {
			let sameOpeningBraces = 0;
			let sameClosingBraces = 0;
			let otherOpeningBraces = 0;
			let otherClosingBraces = 0;
			let found = false;
			let closingCounterpart = getCouterpart(brace);

			for (let j = i + 1; j < braceArray.length; j++) {
				const nextBrace = braceArray[j];

				if (nextBrace !== brace && opening(nextBrace)) otherOpeningBraces += 1;

				if (nextBrace !== closingCounterpart && closing(nextBrace)) otherClosingBraces += 1;

				const innerOtherTypeBalanced = otherOpeningBraces === otherClosingBraces;

				if (nextBrace === brace) sameOpeningBraces += 1;

				const innerSameTypeBalanced = sameOpeningBraces === sameClosingBraces;
				const braceMatch = nextBrace === closingCounterpart;

				if (innerSameTypeBalanced && innerOtherTypeBalanced && braceMatch) {
					found = true;
					break;
				} else if (braceMatch) {
					sameClosingBraces += 1;
				}
			}
			if (!found) return false;
		}
	}
	return true;
}
//helpers
function braceArrayGenerator(string) {
	const braces = [];
	for (let char of string) {
		if (char === '(' || char === '{' || char === '[') {
			braces.push(char);
		} else if (char === ')' || char === '}' || char === ']') {
			braces.push(char);
		}
	}
	return braces;
}

function getCouterpart(brace) {
	if (brace === '(') return ')';
	else if (brace === '{') return '}';
	else if (brace === '[') return ']';
	else if (brace === ')') return '(';
	else if (brace === '}') return '{';
	else if (brace === ']') return '[';
}

function braceMatch(brace, compareWith) {
	return brace === getCouterpart(compareWith);
}

function opening(brace) {
	if (brace === '(') return true;
	else if (brace === '{') return true;
	else if (brace === '[') return true;
	return false;
}

function closing(brace) {
	if (brace === ')') return true;
	else if (brace === '}') return true;
	else if (brace === ']') return true;
	return false;
}

function pairCheck(braceArr) {
	let openingNum = 0;
	let closingNum = 0;
	for (let brace of braceArr) {
		if (opening(brace)) openingNum += 1;
		if (closing(brace)) closingNum += 1;
	}
	return openingNum === closingNum;
}
export { balancedBraces };
