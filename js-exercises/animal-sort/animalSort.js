const animalSort = (animals) => {
	animals.sort((prevAnimal, nextAnimal) => {
		if (prevAnimal.numberOfLegs < nextAnimal.numberOfLegs) return -1;
		if (prevAnimal.numberOfLegs > nextAnimal.numberOfLegs) return 1;
		else {
			if (prevAnimal.name < nextAnimal.name) return -1;
			if (prevAnimal.name > nextAnimal.name) return 1;
		}
	});
	return animals;
};

export { animalSort };
