//working example from tabrez

const allPromises = (promises) => {
	const results = [];
	let completedPromises = 0;
	return new Promise((resolve, reject) => {
		promises.forEach((promise, index) => {
			if (promise instanceof Promise) {
				promise
					.then((value) => {
						results[index] = value;
						completedPromises += 1;
						if (completedPromises === promises.length) {
							resolve(results);
						}
					})
					.catch((error) => {
						reject(error);
					});
			} else {
				results[index] = promise;
				completedPromises += 1;
				if (completedPromises === promises.length) {
					resolve(results);
				}
			}
		});
	});
};

export { allPromises };
