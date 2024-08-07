const remove_duplicates = require("../remove_duplicates");

module.exports = function handleBanks(
	//* we will take ogdas as an example, now ogda is the obj in the array ogdas that in pikod and ogdas[ogda.ogdaId] is the object we are making in our ogdas array
	obj, //? the key of the object we are writing to, example: ogdas[ogda.ogdaId]
	name, //? the name of the object, example: ogda.ogdaId
	id_field, //? the id of the upperLevel object : pikodId
	id, //? the id of the the upperLevel object : pikod.pikodId
	arr_id, //? the id of the lowerLevel array :  hativaId
	ownLevel_arr, //? the lowerLevel array : ogda.hativas
	lowerLevel_arr, //? the lowerLevel array : hativas
	isTop //? check if Top field (preferably boolean)
) {
	return obj && obj[lowerLevel_arr].length > 0
		? {
				...obj,
				[lowerLevel_arr]: [
					...new Set(
						obj[lowerLevel_arr]
							.concat(ownLevel_arr?.map((onl) => onl[arr_id]) ?? [])
							.sort()
					),
				],
		  }
		: !isTop
		? {
				name: name,
				[id_field]: id,
				[lowerLevel_arr]: ownLevel_arr?.map((onl) => onl[arr_id]) ?? [],
		  }
		: {
				name: name,
				[lowerLevel_arr]: ownLevel_arr?.map((onl) => onl[arr_id]) ?? [],
		  };
};
