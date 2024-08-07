const handleBanks = require("../call_functions/banks/handleBanks");
const handleBanksResult = require("../call_functions/banks/handleBanksResult");
const Pikod = require("../models/units/pikod");

exports.getUnitTree = async (req, res) => {
	const pipeline = [
		{
			$lookup: {
				from: "ogdas",
				localField: "_id",
				foreignField: "pikod",
				as: "ogdas",
			},
		},
		{
			$unwind: "$ogdas",
		},
		{
			$lookup: {
				from: "hativas",
				localField: "ogdas._id",
				foreignField: "ogda",
				as: "ogdas.hativas",
			},
		},
		{
			$unwind: "$ogdas.hativas",
		},
		{
			$lookup: {
				from: "gdods",
				localField: "ogdas.hativas._id",
				foreignField: "hativa",
				as: "ogdas.hativas.gdods",
			},
		},
		{
			$group: {
				_id: {
					pikodId: "$_id",
					pikodName: "$name",
					ogdaId: "$ogdas._id",
					ogdaName: "$ogdas.name",
					hativaId: "$ogdas.hativas._id",
					hativaName: "$ogdas.hativas.name",
				},
				gdods: { $first: "$ogdas.hativas.gdods" },
			},
		},
		{
			$group: {
				_id: {
					pikodId: "$_id",
					pikodName: "$name",
					ogdaId: "$_id.ogdaId",
					ogdaName: "$_id.ogdaName",
				},
				hativas: {
					$push: {
						hativaId: "$_id.hativaId",
						hativaName: "$_id.hativaName",
						gdods: "$gdods",
					},
				},
			},
		},
		{
			$group: {
				_id: {
					pikodId: "$_id.pikodId",
					pikodName: "$_id.pikodName",
				},
				ogdas: {
					$push: {
						ogdaId: "$_id.ogdaId",
						ogdaName: "$_id.ogdaName",
						hativas: "$hativas",
					},
				},
			},
		},
		{
			$project: {
				_id: 0,
				pikodId: "$_id.pikodId.pikodId",
				pikodName: "$_id.pikodId.pikodName",
				ogdas: 1,
			},
		},
	];
	const start = performance.now();

	const result = await Pikod.aggregate(pipeline);
	const gdods = {};
	const hativas = {};
	const ogdas = {};
	const pikods = {};
	result.forEach((pikod) => {
		pikod.ogdas?.forEach((ogda) => {
			ogda.hativas?.forEach((hativa) => {
				hativa.gdods?.forEach((gdod) => {
					gdods[gdod._id] = { name: gdod.name, hativaId: hativa.hativaId };
				});

				// adding mkabaz to mkabaz dict
				hativas[hativa.hativaId] = handleBanks(
					hativas[hativa.hativaId],
					hativa.hativaName,
					"ogdaId",
					ogda.ogdaId,
					"_id",
					hativa.gdods,
					"gdods"
				);
			});
			// adding magads to dict
			ogdas[ogda.ogdaId] = handleBanks(
				ogdas[ogda.ogdaId],
				ogda.ogdaId,
				"pikodId",
				pikod.pikodId,
				"hativaId",
				ogda.hativas,
				"hativas"
			);
		});

		pikods[pikod.pikodId] = handleBanks(
			pikods[pikod.pikodId],
			pikod.pikodName,
			null,
			null,
			"ogdaId",
			pikod.ogdas,
			"ogdas",
			true
		);
		//  {
		// 	name: pikod.pikodName,
		// 	ogdas: pikod.ogdas?.map((ogda) => ogda.ogdaId) ?? [],
		// };
	});
	let final = handleBanksResult(result, "pikodId");
	//! one of those is redandent need to see who

	const sum = {};
	const Top = {};
	Object.keys(pikods).map((key) => {
		{
			sum[pikods[key].name] = [
				...new Set(
					pikods[key].ogdas
						.map((el) => ogdas[el])
						.map((item) => item)
						.map((hativa) => hativa.hativas)
						.flat()
						.map((hat) => hativas[hat].gdods)
						.flat()
				),
			];
			Top[key] = sum[pikods[key].name];
		}
	});
	const end = performance.now();

	console.log(`time to calc units ${~~(end - start)} ms`);

	return { gdods, hativas, ogdas, pikods, final, sum, Top };
};
