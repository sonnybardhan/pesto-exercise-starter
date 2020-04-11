function sumAll(arr) {
	let small, big;
	if (arr[0] < arr[1]) {
		small = arr[0];
		big = arr[1];
	} else {
		small = arr[1];
		big = arr[0];
	}
	let sum = 0;
	for (let i = small; i <= big; i++) {
		sum += i;
	}
	return sum;
}

export { sumAll };
