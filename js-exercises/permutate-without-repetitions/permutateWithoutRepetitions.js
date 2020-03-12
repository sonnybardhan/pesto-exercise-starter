/**
 * @param {*[]} permutationOptions
 * @return {*[]}
 */
function permutateWithoutRepetitions(options) {
	const permutations = [];
	permutations.push(options);

	for (let i = 0; i < options.length; i++) {
		let permutation = [];
		for (j = 0; j < options.length; j++) {
			//swap
		}
		permutations.push(permutation);
	}
	return permutations;
}

export { permutateWithoutRepetitions };
