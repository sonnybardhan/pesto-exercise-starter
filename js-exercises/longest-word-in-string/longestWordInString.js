function longestWordInString(sentence) {
	const wordArray = sentence.split(' ');
	const wordList = {};

	for (let word of wordArray) {
		wordList[word] = (wordList[word] || 0) + 1;
	}
	let maxLength;

	for (let word of Object.keys(wordList)) {
		const wordLength = word.length;
		if (!maxLength) {
			maxLength = wordLength;
		} else {
			maxLength = Math.max(maxLength, wordLength);
		}
	}

	return maxLength;
}

export { longestWordInString };
