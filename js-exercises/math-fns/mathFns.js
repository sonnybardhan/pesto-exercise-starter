// Don't change the export values.
// You can use the function in the Math module

function calculate(operation) {
	return function(value1, value2) {
		switch (operation) {
			case 'sqrt':
				return Math.sqrt(value1);
			case 'power':
				return Math.pow(value1, value2);
			case 'round':
				return Math.round(value1);
			default:
				break;
		}
	};
}

const sqrt = calculate('sqrt');
const power = calculate('power');
const round = calculate('round');

export { sqrt, power, round };
