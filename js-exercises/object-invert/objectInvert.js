function objectInvert(obj) {
	const newKeys = Object.values(obj);
	const newValues = Object.keys(obj);
	const invertedObj = populateObj(newKeys, newValues);
	return invertedObj;
}

function populateObj(newKeys, newValues) {
	const obj = {};
	// for (let i = 0; i < newKeys.length; i++) {
	// 	const key = newKeys[i];
	// 	const value = newValues[i];
	// 	obj[key] = value;
	// }

	newKeys.forEach((element, index) => {
		obj[element] = newValues[index];
	});
	return obj;
}

export { objectInvert };
