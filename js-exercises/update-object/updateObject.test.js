import { updateObject } from './updateObject';

describe('updateObject', () => {
	it('should return the correct updated array', () => {
		const expectedResult = [ 'a', '_', 'c' ];
		const result = updateObject(1, '_', [ 'a', 'b', 'c' ]);
		expect(result).toEqual(expectedResult);
	});

	it('should return the correct updated array', () => {
		const expectedResult = [ 'a', 'b', '_' ];
		const result = updateObject(-1, '_', [ 'a', 'b', 'c' ]);
		expect(result).toEqual(expectedResult);
	});

	it('should return an error message for less than 3 arguments', () => {
		const result = updateObject('pants', '_');
		expect(result).toBe('Missing arguments. Expected: index(number), item(any data type), array(array)');
	});

	it('should return an error message for a missing array in arguments', () => {
		const result = updateObject(-1, '_', 'pants');
		expect(result).toBe('Invalid input/s. Expected: index(number), item(any data type), array(array)');
	});
});
