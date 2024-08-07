module.exports = function dupFromArrayOfObject(arr, filter) {
	const uniqueObjects = {};
	const resultArray = [];

	for (const obj of arr) {
		const lookup = filter ? Object.keys(obj).indexOf(filter) : 0;
		// console.log(Object.keys(obj));
		const key = Object.values(obj)[lookup];
		if (!uniqueObjects[key]) {
			uniqueObjects[key] = true;
			resultArray.push(obj);
		}
	}
	return resultArray;
};
