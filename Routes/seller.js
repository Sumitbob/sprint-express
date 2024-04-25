const express = require('express');
const router = express.Router();
const SellerController = require('../Controllers/SellerController');
const ResponseHandler = require('../Middlewares/Handlers/ResponseHandler');
const { sellerSignUpValidator } = require('../Validators/SellerRequestValidator');
const { sendLoginOtpValidator } = require('../Validators/UserRequestValidator');

router.post('/signup-otp', sendLoginOtpValidator.validate.bind(sendLoginOtpValidator), ResponseHandler.handle(SellerController.signupOtp));

router.post('/seller-signup', sellerSignUpValidator.validate.bind(sellerSignUpValidator), ResponseHandler.handle(SellerController.sellerSignUp));

module.exports = router;