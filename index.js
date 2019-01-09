const sift = require('sift').default;

const logger = {
	_filters = {},

	setFilters: (filters) => {
		logger._filters = filters;
	},

	log: (object) => {
		return new Promise((resolve, reject) => {
			const matchingFilters = logger.applyFilters(object);
			matchingFilters.push('ALL');

			const configs = matchingFilters
				.filter((filterName) => process.env[filterName + '_LOGGING'] !== undefined)
				.map((filterName) => process.env[filterName + '_LOGGING']);

			const promises = configs.map((config) => logger.insert(config, object));

			Promise.all(promises).then((results) => {
				resolve(results);
			}).catch((errors) => {
				reject(errors);
			})
		});
	},

	applyFilters: (object) => {
        	return Object.keys(logger._filters).filter((filterName) => sift(logger._filters[filterName], [object]).length > 0);
    	},

	insert: (config, object) => {
		return new Promise((resolve, reject) => {
			logger.getClient(config).then((client) => {
				client.log(object).then((result) => {
					resolve(result);
				}).catch((error) => {
					reject(error);
				});
			}).catch((error) => {
				reject(error);
			});
		});
	},

	getClient: () => {
		return new Promise((resolve) => {
			// Init and resolve client

			resolve({
				log: (object) => {
					return new Promise((resolve) => {
						console.log(object);
						resolve({_date: new Date()});
					});
				}
			});
		});
	}
};

module.exports = logger;

