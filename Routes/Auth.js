const express = require('express');
const AuthController = require('../Controllers/AuthController');

const router = express.Router();

const authMiddleware = (req, res, next) => {
	req.authController = new AuthController(res, next);
	next();
};

router.post('/register', authMiddleware, async (req) => {
	await req.authController.sendRegistrationOtp(req);
});

router.post('/login', authMiddleware, async (req) => {
	await req.authController.login(req);
});

module.exports = router;