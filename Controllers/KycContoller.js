const KycService = require('../Services/KycService');
// const { Validator } = require('../Middlewares/Handlers');

const multer = require('multer');
const os = require('os');
// class KycController {
// 	static checkFileExtension (req, file, cb) {
// 		const allowedMimeTypes = ['image/png', 'image/jpg', 'image/jpeg', 'application/pdf', 'application/msword', 'application/vnd.openxmlformats-officedocument.wordprocessingml.document'];
// 		if (!allowedMimeTypes.includes(file.mimetype)) {
// 			req.fileError = 'Only pdf, png, jpg, jpeg, doc, or docx files are allowed';
// 			return cb(null, false);
// 		}

// 		return cb(null, true);
// 	}

// 	static uploadItemImage =  multer({
// 		fileFilter: (req, file, cb) => {
// 			const a = KycController.checkFileExtension(req, file, cb);
// 			console.log({a});
// 		}
// 	}).fields([
// 		{ name: 'pan', maxCount: 1 },
// 		{ name: 'adharFront', maxCount: 1 },
// 		{ name: 'adharBack', maxCount: 1 },
// 		{ name: 'gst', maxCount: 1 },
// 		{ name: 'cin', maxCount: 1 }
// 	]);

// 	static async documentsUpload (req, res) {
// 		try {
// 			KycController.uploadItemImage(req, res, async (err) => {
// 				if (err instanceof multer.MulterError) {
// 					// Multer error handling
// 					return res.status(400).json({ success: false, error: err.message });
// 				} else if (err) {
// 					// Other errors
// 					console.log("000")
// 					return res.status(500).json({ success: false, error: err.message });
// 				}
// 				console.log('gfhvjbknlm');
// 				// Multer upload succeeded, handle the files
// 				const files = req.files;
// 				console.log(files);
// 				const body = req.body;
// 				const result = await KycService.documentsUpload(files, body);
// 				return res.json({ success: true, result });
// 			});
// 		} catch (error) {
// 			// Internal server error
// 			return res.status(500).json({});
// 		}
// 	}
// }



class KycController {
	static multerStorage = multer.diskStorage({
		destination: os.tmpdir() + '/shypmax',
		filename: function (req, file, cb) {
			const name = Date.now() + '-' + file.originalname;
			cb(null, name);
		},
	});

	static uploadItemImage = multer({
		storage: KycController.multerStorage,
		fileFilter: (req, file, cb) => {
			if (
				file.mimetype !== 'image/png' &&
                file.mimetype !== 'image/jpg' &&
                file.mimetype !== 'image/jpeg' &&
                file.mimetype !== 'application/pdf' &&
                file.mimetype != 'application/msword' &&
                file.mimetype != 'application/vnd.openxmlformats-officedocument.wordprocessingml.document'
			) {
				req.file_error = 'Only pdf, png, jpg, jpeg, doc, or docx files are allowed';
				return cb(null, false);
			}
			cb(null, true);
		},
	}).fields([
		{ name: 'pan', maxCount: 1 },
		{ name: 'adharFront', maxCount: 1 },
		{ name: 'adharBack', maxCount: 1 },
		{ name: 'gst', maxCount: 1 },
		{ name: 'cin', maxCount: 1 },
	]);

	static async documentsUpload (req, res) {
		try {
			KycController.uploadItemImage(req, res, async (err) => {
				if (err instanceof multer.MulterError) {
					// Multer error handling
					return res.status(400).json({ success: false, error: err.message });
				} else if (err) {
					// Other errors
					return res.status(500).json({ success: false, error: err.message });
				}
				// Files have been uploaded successfully, proceed with processing
				const files = req.files;
				console.log('Uploaded files:', files); // Log uploaded files
				const body = req.body;
				await KycService.documentsUpload(files, body);
				// Respond to the client if needed
				return res.status(200).json({ success: true });
			});
		} catch (error) {
			// Internal server error
			console.log(error);
			return res.status(500).json({ success: false, error: error.message });
		}
	}
}

module.exports = KycController;



