const axios = require('axios');
const TransponseReqestResponse = require('../TransponseRequestResponse'); ///

class Base extends TransponseReqestResponse {
	constructor (validatorClass) {
		super();
		this.validatorClass = validatorClass;
	}

	get clientId () {
		return 'TEST10171219edd76a45a85dc5471cd891217101';//get from static
	}

	get clientSecret () {
		return ''; //get from static
	}

	get apiEndpointUrl () {
		return ['https://sandbox.cashfree.com/pg', this.serviceEndpoint].join('/');
	}

	get apiVersion () {
		return '2023-08-01';
	}

	async postQuery (data) {
		try {
			const url = this.apiEndpointUrl;
			const authHeader = {
				headers: {
					'x-api-version': this.apiVersion,
					'x-client-id': this.clientId,
					'x-client-secret': this.clientSecret
				}
			};
			const response = await axios.post(url, data, authHeader);
			return response.data;
		} catch (error) {
			throw error.response || { data: error.message } || error;
		}
	}

	async call (data) {
		data = await this.validate(data);
		const requestTranspose = this.transposeRequest(data);
		const response = await this.postQuery(requestTranspose);
		const responseTranspose = this.transposeResponse(response);

		return { response: responseTranspose, rawResponse: JSON.stringify(response), rawRequest: JSON.stringify(data) };
	}
}


module.exports = Base;