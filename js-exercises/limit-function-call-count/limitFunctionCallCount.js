const limitFunctionCallCount = (cb, count) => {
	let timesCalled = 0;
	return function(...args) {
		if (timesCalled < count) {
			timesCalled += 1;
			return cb(...args);
		} else {
			return null;
		}
	};
};

export { limitFunctionCallCount };
