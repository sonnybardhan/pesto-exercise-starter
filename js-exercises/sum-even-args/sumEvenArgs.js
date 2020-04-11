const sumEvenArgs = (...args) => {
	return args.reduce((accumulator, number) => {
		if (number % 2 === 0) return accumulator + number;
		return accumulator;
	}, 0);
};

export { sumEvenArgs };
