function leastCommonMultiple(...args) {
	const num1 = args[0];
	const num2 = args[1];

	if (isDivisor(num1, num2)) return num1;
	if (isDivisor(num2, num1)) return num2;

	const answer = num1 * num2 / greatestCommonDivisor(num1, num2);
	return answer;
}

function greatestCommonDivisor(num1, num2) {
	if (isDivisor(num1, num2)) return num2;
	if (isDivisor(num2, num1)) return num1;

	let gcd = 1;
	let i = 1;
	const bigger = num1 > num2 ? num1 : num2;
	const highestPossibleDivisor = bigger / 2;

	while (i <= highestPossibleDivisor) {
		if (isDivisor(num1, i) && isDivisor(num2, i)) {
			gcd = i;
		}
		i++;
	}
	return gcd;
}

function isDivisor(num1, num2) {
	return num1 % num2 === 0;
}

export { leastCommonMultiple };
