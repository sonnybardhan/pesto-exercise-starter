const parseMs = (ms) => {
	if (!isFinite(ms)) return 'Invalid input, expected a time in milliseconds in the form of a "number"';

	const time = {
		days: 0,
		hours: 0,
		minutes: 0,
		seconds: 0,
		milliseconds: 0,
		microseconds: 0,
		nanoseconds: 0
	};

	const unitsOfTime = {
		days: 24 * 60 * 60 * 1000,
		hours: 60 * 60 * 1000,
		minutes: 60 * 1000,
		seconds: 1000,
		milliseconds: 1,
		microseconds: 1 / 1000,
		nanoseconds: 1 / 1000000
	};

	let timeRemaining = ms;
	let i = 0;

	while (timeRemaining) {
		const unit = Object.keys(unitsOfTime)[i];
		const value = Object.values(unitsOfTime)[i];

		time[unit] = calculate(value, timeRemaining);
		timeRemaining %= value;
		i++;
	}

	return time;
};

function calculate(unit, time) {
	const units = Math.floor(time / unit);
	return units;
}

export { parseMs };
