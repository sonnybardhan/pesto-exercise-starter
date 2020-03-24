class MyPromise {
	constructor(executorFn) {
		this.state = 'pending';

		const resolve = (...values) => {
			if (!this.state === 'pending') return;
			this.state = 'fulfilled';
			this.result = values;
			this.onResolved(this.result);
		};

		const reject = () => {
			if (!this.state === 'pending') return;
			this.state = 'rejected';
		};

		executorFn(resolve, reject);
	}

	then(onResolved, onRejected) {
		this.onResolved = onResolved;
	}
}

// function myPromise(...args) {
//   return args;
// }

export { myPromise };
