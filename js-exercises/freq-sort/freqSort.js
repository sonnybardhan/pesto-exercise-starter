function freqSort(arr) {
	const freqMap = arr.reduce((acc, char) => {
		acc[char] = (acc[char] || 0) + 1;
		return acc;
	}, {});

	return Object.keys(freqMap).sort((prev, next) => {
		if (freqMap[prev] < freqMap[next]) return 1;
		if (freqMap[prev] > freqMap[next]) return -1;
	});
}

export { freqSort };
