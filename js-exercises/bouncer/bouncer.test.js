import { bouncer } from './bouncer';

describe('bouncer', () => {
	it('should only return truthy values', () => {
		const result = bouncer([ false, null, 0, NaN, undefined, '', 9 ]);
		expect(result).toEqual([ 9 ]);
	});

	it('should return and empty array', () => {
		const result = bouncer([ false, null, 0, NaN, undefined, '' ]);
		expect(result).toHaveLength(0);
	});

	it('should return appropriate error message non-array inputs', () => {
		const result = bouncer('invalid input');
		expect(result).toEqual('Received a non-array as an input.');
	});
});
