const Algorithm = require('../models/Algorithm');

exports.getAlgorithms = async (req, res) => {
	try {
		const algorithms = await Algorithm.find().select('-implementation'); res.json(algorithms);
	}
	catch (err) {
		res.status(500).json({ message: err.message });
	}
};

exports.getAlgorithm = async (req, res) => {
	try {
		const algorithm = await Algorithm.findById(req.params.id);

		if (!algorithm) {
			return res.status(404).json({ message: 'Algorithm not found' });
		}
		
		res.json(algorithm);
	}
	catch (err) {
		res.status(500).json({ message: err.message });
	}
};

exports.executeAlgorithm = async (req, res) => {
	try {
		const { id } = req.params;
		const { array } = req.body;
		const algorithm = await Algorithm.findById(id);

		if (!algorithm) {
			return res.status(404).json({ message: 'Algorithm not found' });
		}

		const startTime = performance.now();
		const { steps, comparisons, swaps } = await executeVisualization(algorithm.implementation, array);
		const executionTime = performance.now() - startTime;

		if (req.user) {
			await UserMetric.create({
				userId: req.user.id,
				algorithmId: id,
				executionTime,
				comparisons,
				swaps,
				arraySize: array.length
			});
		}

		res.json({ steps, executionTime, comparisons, swaps });
	}
	catch (err) {
		res.status(500).json({ message: err.message });
	}
};
