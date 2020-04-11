const forEach = (fn, array) => {
	for (let i = 0; i < array.length; i++) {
		fn(array[i], i, array);
	}
};

const map = (fn, array) => {
	const newArray = [];
	for (let i = 0; i < array.length; i++) {
		newArray.push(fn(array[i], i, array));
	}
	return newArray;
};

const filter = (fn, array) => {
	const filteredArray = [];
	for (let i = 0; i < array.length; i++) {
		const result = fn(array[i], i, array);
		if (result) {
			filteredArray.push(result);
		}
	}
	return filteredArray;
};

const reduce = (fn, array, initial) => {
	let accumulator = initial || 0;

	for (let i = 0; i < array.length; i++) {
		accumulator = fn(accumulator, array[i], i, array);
	}
	return accumulator;
};

export { forEach, map, filter, reduce };
