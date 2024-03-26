const {DatabaseErrorHandler} = require('../Middlewares/Handlers');

class BaseRepository {
	constructor(model) {
		this.model = model;
	}

	async create(data) {
		try {
			const entity = await this.model.create(data);
			return entity;
		} catch (error) {
			throw new Error(DatabaseErrorHandler.handle(error));
		}
	}

	async findById(id) {
		try {
			const entity = await this.model.findByPk(id);
			return entity;
		} catch (error) {
			throw new Error(DatabaseErrorHandler.handle(error));
		}
	}

	async update(id, data) {
		try {
			const [rowsUpdated, updatedEntities] = await this.model.update(data, {
				where: {id},
				returning: true,
			});
			if (rowsUpdated === 0) {
				throw new Error('Entity not found');
			}
			return updatedEntities[0];
		} catch (error) {
			throw new Error(DatabaseErrorHandler.handle(error));
		}
	}

	async updateAll(data, options = {}) {
		try {
			const result = await this.model.update(data, options);
			return result;
		} catch (error) {
			throw new Error(DatabaseErrorHandler.handle(error));
		}
	}

	async delete(id) {
		try {
			const rowsDeleted = await this.model.destroy({where: {id}});
			if (rowsDeleted === 0) {
				throw new Error('Entity not found');
			}
			return {success: true};
		} catch (error) {
			throw new Error(DatabaseErrorHandler.handle(error));
		}
	}

	async findAll() {
		try {
			const entities = await this.model.findAll();
			return entities;
		} catch (error) {
			throw new Error(DatabaseErrorHandler.handle(error));
		}
	}

	async count() {
		try {
			const count = await this.model.count();
			return count;
		} catch (error) {
			throw new Error(DatabaseErrorHandler.handle(error));
		}
	}

	async findAndCountAll(options = {}) {
		try {
			const result = await this.model.findAndCountAll(options);
			return result;
		} catch (error) {
			throw new Error(DatabaseErrorHandler.handle(error));
		}
	}

	async findOne(options = {}) {
		try {
			const entity = await this.model.findOne(options);
			if (!entity) {
				throw new Error('Entity not found');
			}
			return entity;
		} catch (error) {
			throw new Error(DatabaseErrorHandler.handle(error));
		}
	}

	async findOrCreate(data) {
		try {
			const [entity, created] = await this.model.findOrCreate({where: data});
			return {entity, created};
		} catch (error) {
			throw new Error(DatabaseErrorHandler.handle(error));
		}
	}

	async bulkCreate(data) {
		try {
			const entities = await this.model.bulkCreate(data);
			return entities;
		} catch (error) {
			throw new Error(DatabaseErrorHandler.handle(error));
		}
	}
}

module.exports = BaseRepository;
