function diffArray(firstArray, secondArray) {
	const unique = [];
	const combined = [ ...firstArray, ...secondArray ];

	for (let element of combined) {
		let inFirstArray = firstArray.indexOf(element);
		let inSecondArray = secondArray.indexOf(element);
		if (inFirstArray < 0 || inSecondArray < 0) unique.push(element);
	}
	return unique;
}

export { diffArray };
