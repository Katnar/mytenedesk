module.exports = function removeDuplicatesByKey(arr, field) {
	const unique = Array.from(
		arr
			.reduce((acc, current) => {
				const existing = acc.get(current[field]);
				if (!existing) {
					acc.set(current[field], current);
				}
				return acc;
			}, new Map())
			.values()
	);

	return unique;
};
