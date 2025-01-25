const mongoose = require('mongoose');
const UserMetricSchema = new mongoose.Schema({
	userId: {
		type: mongoose.Schema.Types.ObjectId,
		ref: 'User', required: true
	},
	algorithmId: {
		type: mongoose.Schema.Types.ObjectId,
		ref: 'Algorithm', required: true
	},
	executionTime: Number,
	comparisons: Number,
	swaps: Number,
	arraySize: Number,
	date: {
		type: Date,
		default: Date.now
	}
});

module.exports = mongoose.model('UserMetric', UserMetricSchema); 
