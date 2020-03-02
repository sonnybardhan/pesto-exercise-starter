function sumFibs(num) {
	let sum = 0;
	let fibs = [ 1, 1 ];

	if (num === 1) return 1;
	if (num === 2) return 1;
	let i = 2;

	let last = fibs[i - 1];
	let secondLast = fibs[i - 2];

	while (last + secondLast <= num) {
		fibs.push(last + secondLast);
		i++;
		last = fibs[i - 1];
		secondLast = fibs[i - 2];
	}

	for (let n of fibs) {
		if (n % 2 === 1) {
			sum += n;
		}
	}
	return sum;
}

export { sumFibs };
