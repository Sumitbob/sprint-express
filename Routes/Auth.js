const express = require('express');
const AuthController = require('../Controllers/AuthController');
const RegistrationAuth = require('../Middlewares/RegistrationAuth');

const router = express.Router();

const authMiddleware = (req, res, next) => {
	req.authController = new AuthController(res, next);
	next();
};

router.post('/send-registration-otp', authMiddleware, async (req, res) => {
	req.authController.sendRegistrationOtp(req, res);
});

router.post('/verify-registration-otp', authMiddleware, async (req, res) => {
	req.authController.varifyRegistrationOtp(req, res);
});

router.post('/register-user', RegistrationAuth.registration, authMiddleware, async (req, res) => {
	req.authController.registerUser(req, res);
});

module.exports = router;
