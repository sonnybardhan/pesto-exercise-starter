import { leastCommonMultiple } from './leastCommonMultiple';

describe('leastCommonMultiple', () => {
	it('should return correct LCM value', () => {
		const result = leastCommonMultiple(6, 21);
		expect(result).toBe(42);
	});

	it('should return correct LCM value', () => {
		const result = leastCommonMultiple(6, 8);
		expect(result).toBe(24);
	});

	it('should return correct LCM value', () => {
		const result = leastCommonMultiple(10, 3);
		expect(result).toBe(30);
	});

	it('should return an error message for zero as an input', () => {
		const result = leastCommonMultiple(0, 3);
		expect(result).toBe('LCM of zero does not exist');
	});

	it('should return an error message for non-number input', () => {
		const result = leastCommonMultiple(0, 'pants');
		expect(result).toBe('Invalid input/s, expected 2 numbers.');
	});
});

//matchers

//toBeNull
//toBeUndefined
//toBeDefined
//.toBeTruthy
//.toBeFalsy
