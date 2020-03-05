function addBigIntegers(intString) {
	// let numbersArray = intString.split('\n');
	// numbersArray.sort((previous, next) => {
	// 	if (previous.length > next.length) return -1;
	// 	if (previous.length < next.length) return 1;
	// });
	// const biggestNumber = numbersArray[0];
	// const startingIndex = biggestNumber.length - 1;
	// let carry = 0;
	// let sumString = '';
	// for (let i = startingIndex; i >= 0; i--) {
	// 	let columnSum = 0;
	// 	for (let row = 0; row < numbersArray.length; row++) {
	// 		const numberAtI = numbersArray[row][i];
	// 		debugger;
	// 		if (numberAtI) {
	// 			columnSum += parseInt(numberAtI);
	// 		}
	// 	}
	// 	columnSum += carry;
	// 	if (i === 0) {
	// 		sumString = sumString.split('').reverse().join('');
	// 		sumString = columnSum + sumString;
	// 	} else if (columnSum < 10) {
	// 		carry = 0;
	// 		sumString += columnSum;
	// 	} else {
	// 		carry = Math.round(columnSum / 10);
	// 		sumString += columnSum % 10;
	// 	}
	// }
	// return sumString;
}

export { addBigIntegers };
