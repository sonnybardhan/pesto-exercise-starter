import { isString } from 'util';

function abbreviateString(str) {
	const wordArray = str.split(' ');
	const firstWord = wordArray[0];
	const lastInitial = wordArray[wordArray.length - 1][0].toUpperCase();

	return `${firstWord} ${lastInitial}.`;
}

export { abbreviateString };
