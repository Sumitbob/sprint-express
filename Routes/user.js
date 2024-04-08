const express = require('express');
const router = express.Router();
const UserController = require('../Controllers/UserController');
const ResponseHandler = require('../Middlewares/Handlers/ResponseHandler');
const { sendLoginOtpValidator } = require('../Validators/UserRequestValidator');

router.post('/send-login-otp', sendLoginOtpValidator.validate.bind(sendLoginOtpValidator), ResponseHandler.handle(UserController.sendLoginOtp));


module.exports = router;
