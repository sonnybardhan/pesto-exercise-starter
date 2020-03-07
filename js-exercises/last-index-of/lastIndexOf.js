function lastIndexOf(...args) {
	const item = args[0];
	const list = args[1].reverse();
	const index = list.indexOf(item);

	if (index < 0) {
		return -1;
	}
	return list.length - (index + 1);
}

export { lastIndexOf };
