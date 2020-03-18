function booleanExpressionEvaluator(expression) {
	const expressionArray = expression.split(' ');
	if (!isValidExpression(expressionArray))
		throw 'Invalid expression. Expression should contain valid Boolean operators';

	let booleanArray = makeBooleanExpression(expressionArray);

	while (booleanArray.length > 1) {
		if (booleanArray[0] === '!true' || booleanArray[0] === '!false') {
			booleanArray[0] = replaceWithBoolean(booleanArray[0]);
		} else {
			const subExp = booleanArray.splice(0, 3);
			const result = evaluatSubExpression(subExp);
			booleanArray.unshift(result);
		}
	}

	if (booleanArray.length === 1) return replaceWithBoolean(booleanArray[0]);
}

function evaluatSubExpression(subExp) {
	const val1 = subExp[0];
	const val2 = subExp[2];

	if (subExp.includes('&') && subExp.includes(false)) {
		return false;
	}
	if (subExp.includes('|') && !subExp.includes(true)) {
		return false;
	}
	if (subExp.includes('^') && val1 === val2) {
		return false;
	}
	return true;
}

function makeBooleanExpression(arr) {
	for (let i = 0; i < arr.length; i++) {
		arr[i] = replaceWithBoolean(arr[i]);
	}
	return arr;
}

function replaceWithBoolean(char) {
	if (char === 'true') return true;
	if (char === 'false') return false;
	if (char === '!true') return false;
	if (char === '!false') return true;
	else return char;
}

function isValidExpression(arr) {
	if (!arr.length) return false;

	const validElements = { true: 1, false: 1, '!true': 1, '!false': 1, '|': 1, '&': 1, '^': 1 };

	for (let element of arr) {
		if (!validElements[element]) {
			return false;
		}
	}
	return true;
}
export { booleanExpressionEvaluator };
