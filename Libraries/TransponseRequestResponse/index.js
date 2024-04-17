const _ = require('lodash');
const ValidationError = require('../../Middlewares/Handlers/ValidationError');


class TransponseReqestResponse {
	constructor (validatorClass) {
		this.validatorClass = validatorClass;
	}
	validator (data) {
		return new this.validatorClass(data);
	}

	async validate (data) {
		const validatorInstance = this.validator(data);
		const { error, value } = await validatorInstance.validate();
		if (error) {
			throw new ValidationError(error.details[0].message);
		}
		return value;

	}
	transposeRequest (data) {
		return this.transpose(data, this.requestKeyMap());
	}

	transposeResponse (data) {
		return this.transpose(data, this.responseKeyMap());
	}

	transpose (data, keyMap) {
		return _.fromPairs(
			_.map(_.toPairs(data), ([key, value]) => {
				if (_.isObject(value) && !_.isArray(value) && keyMap[key]) {
					return [keyMap[key], this.transpose(value, keyMap)];
				} else {
					return [keyMap[key] || key, value];
				}
			}),
		);
	}
	updateDefaultData (data) {
		for (const [key, value] of Object.entries(this.defaultRequestData)) {
			data[key] = data[key] ? data[key] : value;
		}
		return data;
	}

}

module.exports = TransponseReqestResponse;