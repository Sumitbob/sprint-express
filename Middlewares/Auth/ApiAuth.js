const jwt = require('jsonwebtoken');
const UnauthorizedError = require('../Handlers/UnauthorizedError');
const AccessTokenModel = require('../../Models/AccessToken');
const ActiveSessionStatus = 1;

class ApiAuth {
	static async authenticate (req, res, next) {
		try {
			const token = req.headers.authorization;
			if (!token) {
				throw new UnauthorizedError('Authorization token is missing');
			}

			const secret = process.env.JWT_SECRET_KEY;
			if (!secret) {
				throw new Error('JWT secret key is not provided');
			}

			const decodedToken = jwt.verify(token, secret);

			const { id: tokenId, userId, source: decodedSource } = decodedToken;
			const refreshToken = await AccessTokenModel.findOne({ id: tokenId });
			if (!(refreshToken && refreshToken.userId === userId && refreshToken.sessionStatus === ActiveSessionStatus && refreshToken.source === decodedSource)) {
				throw new UnauthorizedError('Invalid token');
			}

			req.userId = userId;
			next();
		} catch (error) {
			next(error);
		}
	}
}

module.exports = ApiAuth;
