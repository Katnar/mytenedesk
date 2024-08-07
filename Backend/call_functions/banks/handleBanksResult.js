const merge = require("lodash/merge"); //? preforming a deep merge (for every object inside the given object)
module.exports = function handleBankResult(res, filed_to_filter) {
	// console.log(res);
	let tmp = {};
	res.map((item) => {
		if (tmp[item[filed_to_filter]]) {
			tmp[item[filed_to_filter]] = merge({}, tmp[item[filed_to_filter]], item);
		} else tmp[item[filed_to_filter]] = item;
	});
	return tmp;
};
