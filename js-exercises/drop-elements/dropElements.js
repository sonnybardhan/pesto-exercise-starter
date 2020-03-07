function dropElements(elements, fn) {
	let i = 0;

	while (i < elements.length) {
		const element = elements[i];
		if (!fn(element)) {
			elements.splice(i, 1);
		} else {
			i++;
		}
	}
	return elements;
}

export { dropElements };
