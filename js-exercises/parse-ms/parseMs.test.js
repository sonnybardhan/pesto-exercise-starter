import { parseMs } from './parseMs';

describe('parseMs', () => {
	it('should return correct values', () => {
		const expectedResult = {
			days: 15,
			hours: 11,
			minutes: 23,
			seconds: 20,
			milliseconds: 1,
			microseconds: 0,
			nanoseconds: 0
		};
		const result = parseMs(1337000001);

		expect(result).toEqual(expectedResult);
	});

	it('should return correct values', () => {
		const expectedResult = {
			days: 0,
			hours: 0,
			minutes: 0,
			seconds: 0,
			milliseconds: 1,
			microseconds: 0,
			nanoseconds: 0
		};
		const result = parseMs(1);

		expect(result).toEqual(expectedResult);
	});

	it('should return an error message for invalid inputs', () => {
		const result = parseMs('pants');
		expect(result).toBe('Invalid input, expected a time in milliseconds in the form of a "number"');
	});
});
