const express = require('express');
const router = express.Router();
const AuthController = require('../Controllers/AuthController');
const ResponseHandler = require('../Middlewares/Handlers/ResponseHandler');

router.post('/send-registration-otp', ResponseHandler.handle(AuthController.sendRegistrationOtp));
router.post('/verify-registration-otp', ResponseHandler.handle(AuthController.verifyRegistrationOtp));
router.post('/register-user', ResponseHandler.handle(AuthController.registerUser));

module.exports = router;
