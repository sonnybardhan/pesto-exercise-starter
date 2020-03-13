function updateObject(...args) {
	const position = args[0];
	const item = args[1];
	const array = args[2];
	array.splice(position, 1, item);

	return array;
}

export { updateObject };
