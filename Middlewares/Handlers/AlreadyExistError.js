class AlreadyExistError extends Error {
	constructor (message) {
		super(message);
		this.name = 'Already exist';
	}
}
  
module.exports=  AlreadyExistError;
  