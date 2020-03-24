const sequentialPromise = (promises) => {
	return new Promise((resolve, reject) => {
		if (promises.length >= 1) {
			const remainingPromises = promises.slice(1);
			sequentialPromise(remainingPromises);
		} else {
			resolve();
		}
	});
};

export { sequentialPromise };
