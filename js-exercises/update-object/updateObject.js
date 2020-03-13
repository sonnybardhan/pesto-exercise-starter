function updateObject(...args) {
	const position = args[0];
	const item = args[1];
	const array = args[2];

	if (args.length < 3) return 'Missing arguments. Expected: index(number), item(any data type), array(array)';
	if (!isFinite(position) || !Array.isArray(array))
		return 'Invalid input/s. Expected: index(number), item(any data type), array(array)';

	array.splice(position, 1, item);

	return array;
}

export { updateObject };
