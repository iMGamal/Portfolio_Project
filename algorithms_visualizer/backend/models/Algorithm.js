const mongoose = require('mongoose');
const AlgorithmSchema = new mongoose.Schema({
	name: {
		type: String,
		required: true,
		unique: true
	},
	category: {
		type: String,
		enum: ['sorting', 'searching', 'graph'],
		required: true
	},
	description: {
		type: String,
		required: true
	},
	timeComplexity: {
		best: String,
		average: String,
		worst: String
	},
	spaceComplexity: String,
	pseudocode: [String],
	implementation: {
		type: String,
		required: true
	},
	visualizationSteps: [
		{
			type: Map,
			of: mongoose.Schema.Types.Mixed
		}]
},
	{
		timestamps: true
	});

module.exports = mongoose.model('Algorithm', AlgorithmSchema)
