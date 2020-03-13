function bouncer(array) {
	if (!Array.isArray(array)) return 'Received a non-array as an input.';
	return array.filter((item) => Boolean(item));
}

export { bouncer };
