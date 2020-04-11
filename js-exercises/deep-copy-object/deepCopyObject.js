const deepCopyObject = (objToCopy) => {
	if (objToCopy === null) return null;
	if (typeof objToCopy !== 'object') return objToCopy;

	const newObj = {};

	for (let key in objToCopy) {
		newObj[key] = typeof objToCopy[key] === 'object' ? deepCopyObject(objToCopy[key]) : objToCopy[key];
	}
	return newObj;
};

export { deepCopyObject };

// if (typeof objToCopy[key] === 'object') {
// 	newObj[key] = deepCopyObject(objToCopy[key]);
// } else {
// 	newObj[key] = objToCopy[key];
// }
