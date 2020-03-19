import { freqSort } from './freqSort';

describe('freqSort', () => {
	const elements = [ 'a', 'z', 'z', 'z', 'b', 'b', 'z' ];

	test('should return an array of unique elements in descending order of frequency ', () => {
		const result = freqSort(elements);
		expect(result).toEqual([ 'z', 'b', 'a' ]);
	});
	const elements2 = [ 'x', 'z', 'x', 'z', 'b', 'b', 'z' ];

	test('should return an array of unique elements in descending order of frequency ', () => {
		const result = freqSort(elements2);
		expect(result).toHaveLength(3);
		console.log(result);
	});
});
