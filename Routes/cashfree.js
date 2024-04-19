const express = require('express');
const router = express.Router();
const CashfreeController = require('../Controllers/CashfreeController');
const ResponseHandler = require('../Middlewares/Handlers/ResponseHandler');
const CashfreeAuth = require('../Middlewares/auth/CashfreeAuth');

router.post('/create-order',  ResponseHandler.handle(CashfreeController.createPaymentOrder));
router.post('/notify', CashfreeAuth.webhookAuth, ResponseHandler.handle(CashfreeController.createPaymentOrderCallback));

module.exports = router;
