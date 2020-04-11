function cacheFunction(cb) {
	const argsCache = {};

	return function(...args) {
		if (argsCache[args]) {
			return argsCache[args];
		}
		const result = cb(...args);
		argsCache[args] = result;
		return argsCache[args];
	};
}

export { cacheFunction };
