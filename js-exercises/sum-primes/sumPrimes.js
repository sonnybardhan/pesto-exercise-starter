function sumPrimes(n) {
	let sum = 0;
	for (let i = 2; i <= n; i++) {
		if (isPrime(i)) {
			sum += i;
		}
	}
	return sum;
}
function isPrime(x) {
	if (x === 2) return true;

	for (let j = 2; j <= x / 2; j++) {
		if (x % j === 0) return false;
	}
	return true;
}

export { sumPrimes };
