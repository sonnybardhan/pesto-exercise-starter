const countingAnagrams = (str) => {
	str = str.split(' ');
	const strArray = str.map((word) => word.split('').sort().join('')).filter((word) => word.length > 1);

	let count = 0;
	const wordFrequencyMap = {};

	for (let word of strArray) {
		wordFrequencyMap[word] = (wordFrequencyMap[word] || 0) + 1;
	}

	for (let word of Object.keys(wordFrequencyMap)) {
		count += wordFrequencyMap[word] > 1 ? 1 : 0;
	}

	return count;
};

export { countingAnagrams };
