const { ValidationError } = require('../Middlewares/Handlers');
const PasswordEncoder = require('../utils/PasswordEncoder');
const RandomNumberGenerator = require('../utils/RandomNumberGenerator');
const KycModel = require('../Models/KycModel');
const KycLibrary = require('../Libraries/Kyc.js')

class KycService {
	constructor () {
		this.randomNumberGenerator = new RandomNumberGenerator();
		this.passwordEncoder = new PasswordEncoder();
	}

	async documentsUpload (files, body) {

        const { organizationType, organizationName, iecNo, aDCode, aDCodeBankACNo, aDCodeBankACName, address1, address2, city, state, country, pincode, restrictedItems } = body;
		// if (files) {
		// 	let tempArr = []
		// 	let fileObj = {}
		// 	const S3classInstance = new S3Class()
		// 	for (const key in files) {
		// 		let fileName = `${sellerId}/kyc/`
		// 		let extName = ''
		// 		let contentType = ''
		// 		let fileContent = ''
		// 		extName = path.extname(req.files[key][0].originalname).toLowerCase()
		// 		fileName = `sellers/${fileName}${key}${extName}`
		// 		if(key == "signature"){
		// 			fileName = `sellers/${sellerId}/signature/${key}${extName}`
		// 		}
		// 		contentType = req.files[key][0].mimetype
		// 		fileContent = fs.readFileSync(req.files[key][0].path)

		// 		if (fileName != '' && contentType != '' && fileContent != '') {
		// 			tempArr.push(S3classInstance.s3Upload(fileName, fileContent, contentType))
		// 			fileObj[key] = fileName
		// 			if(key == "signature"){
		// 				let updateResult = await SellerController.updateStatus(fileName, sellerId)
		// 			}
		// 		}


		// 	}
		// 	if (tempArr.length == 0) {
		// 		return Promise.resolve(false)
		// 	}
		// 	await Promise.all(tempArr)
		// 	return Promise.resolve(JSON.stringify(fileObj))
		// }

		return true;
	}

	async kycDocumentRequired (organizationType) {
		// yha se do option h 1.db se fetch kre kyakya documnet chahye 2.static m store krle 
	}
}

module.exports = new KycService();
