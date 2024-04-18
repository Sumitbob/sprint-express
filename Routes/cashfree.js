const express = require('express');
const router = express.Router();
const CashfreeController = require('../Controllers/CashfreeController');
const ResponseHandler = require('../Middlewares/Handlers/ResponseHandler');

router.post('/create-order',  ResponseHandler.handle(CashfreeController.createPaymentOrder));
router.post('/notify',  ResponseHandler.handle(CashfreeController.createPaymentOrderCallback));

module.exports = router;
