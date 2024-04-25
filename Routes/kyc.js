/* eslint-disable camelcase */
const express = require('express');
const router = express.Router();
const KycController = require('../Controllers/KycContoller');
const ResponseHandler = require('../Middlewares/Handlers/ResponseHandler');
const { KycValidator, KycDocumentRequired } = require('../Validators/KycValidator');
const multer = require('multer');

// const checkFileExtension = (req, file, cb) => {
// 	const allowedMimeTypes = ['image/png', 'image/jpg', 'image/jpeg', 'application/pdf', 'application/msword', 'application/vnd.openxmlformats-officedocument.wordprocessingml.document'];
// 	if (!allowedMimeTypes.includes(file.mimetype)) {
// 		req.fileError = 'Only pdf, png, jpg, jpeg, doc, or docx files are allowed';
// 		return cb(null, false);
// 	}
// 	cb(null, true);
// };

// const uploadItemImage = multer({
// 	fileFilter: (req, file, cb) => {
// 		checkFileExtension(req, file, cb);
// 	}
// }).fields([
// 	{ name: 'pan', maxCount: 1 },
// 	{ name: 'adharFront', maxCount: 1 },
// 	{ name: 'adharBack', maxCount: 1 },
// 	{ name: 'gst', maxCount: 1 },
// 	{ name: 'cin', maxCount: 1 }
// ]);


// router.post('/documents-upload', uploadItemImage, async (req, res) => {
// 	const files = req.files;
// 	console.log(files);
// 	dvfb;
	
// });

router.post('/documents-upload', 
//  KycValidator.validate.bind(KycValidator),
	ResponseHandler.handle(KycController.documentsUpload));

router.post('/document-box', KycValidator.validate.bind(KycDocumentRequired), ResponseHandler.handle(KycController.kycDocumentRequired));

module.exports = router;