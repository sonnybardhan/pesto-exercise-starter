function removeFalsyValues(array) {
	return array.filter((value) => Boolean(value));
}

export { removeFalsyValues };
