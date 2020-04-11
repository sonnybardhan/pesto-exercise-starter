function updateInventory(...args) {
	const currentInv = args[0];
	const newInv = args[1];

	if (currentInv === []) return newInv;
	if (newInv === []) return currentInv;

	for (let item of newInv) {
		let foundIndex = currentInv.findIndex((thing) => thing[1].includes(item[1]));

		if (foundIndex > -1) {
			currentInv[foundIndex][0] += item[0];
		} else {
			currentInv.push(item);
		}
	}
	return currentInv.sort((previousItem, nextItem) => {
		if (previousItem[1] < nextItem[1]) return -1;
		if (previousItem[1] > nextItem[1]) return 1;
	});
}

export { updateInventory };
