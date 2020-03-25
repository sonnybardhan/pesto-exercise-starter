function alternatingCharacters(arr) {
	let deletesArr = [];
	for (let i = 0; i < arr.length; i++) {
		let deletes = 0;
		let string = arr[i];
		for (let j = 1; j < string.length; j++) {
			const prev = string[j - 1];
			const next = string[j];
			if (prev === next) {
				deletes += 1;
			}
		}
		deletesArr.push(deletes);
	}
	return deletesArr;
}

export { alternatingCharacters };
