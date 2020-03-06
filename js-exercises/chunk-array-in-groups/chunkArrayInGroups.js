function chunkArrayInGroups(array, chunkSize) {
	let superSet = [];

	for (let i = 0; i < array.length; i += chunkSize) {
		let subSet = [];
		for (let j = i; j < i + chunkSize; j++) {
			if (array[j] !== undefined) {
				subSet.push(array[j]);
			} else {
				break;
			}
		}
		superSet.push(subSet);
	}
	return superSet;
}

export { chunkArrayInGroups };
