const axios = require('axios');
const TransponseReqestResponse = require('../TransponseRequestResponse'); ///

class Base extends TransponseReqestResponse {
	constructor (validatorClass) {
		super();
		this.validatorClass = validatorClass;
	}

	get clientId () {
		return process.env.CLIENT_ID;//get from static
	}

	get clientSecret () {
		return process.env.CLIENT_SECRET; //get from static
	}

	get apiEndpointUrl () {
		return ['https://sandbox.cashfree.com/pg', this.serviceEndpoint].join('/');
	}

	async postQuery (data) {
		try {
			const url = this.apiEndpointUrl;
			const authHeader = {
				headers: {
					'Authorization': `Basic ${Buffer.from(`${this.clientId}:${this.clientSecret}`).toString('base64')}`
				}
			};
			const response = await axios.post(url, data, authHeader);
			return response.data; 
		} catch (error) {
			throw new Error(error);
		}
	}

	async call (data) {
		data = await this.validate(data);
		const requestTranspose = this.transposeRequest(data);
		const response = await this.postQuery(requestTranspose);
		const responseTranspose = this.transposeResponse(response);
		return { response : responseTranspose, rawResponse : JSON.stringify(response), rawRequest : JSON.stringify(data) };
	}
}


module.exports = Base;