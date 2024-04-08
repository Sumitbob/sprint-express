class BaseModel {
	constructor (tableName) {
		this.tableName = tableName;
	}

	async findAll (options) {
		let condition = '';
		let values = [];

		if (options) {
			condition = 'WHERE ' + Object.keys(options).map(key => `${key} = ?`).join(' AND ');
			values = Object.values(options);
		}

		const sql = `SELECT * FROM ${this.tableName} ${condition}`;
		const [rows] = await readDb.query(sql, values);
		return rows;
	}

	async findById (id) {
		const sql = `SELECT * FROM ${this.tableName} WHERE id = ?`;
		const [rows] = await readDb.query(sql, [id]);
		return rows[0];
	}

	async findOne (options) {
		const condition = 'WHERE ' + Object.keys(options).map(key => `${key} = ?`).join(' AND ');
		const values = Object.values(options);
		const sql = `SELECT * FROM ${this.tableName} ${condition}`;
		const [rows] = await readDb.query(sql, values);
		return rows[0];
	}

	async findWithPagination (options, page = 1, limit = 10) {
		const offset = (page - 1) * limit;
		let condition = '';
		let values = [];

		if (options) {
			condition = 'WHERE ' + Object.keys(options).map(key => `${key} = ?`).join(' AND ');
			values = Object.values(options);
		}

		const sql = `SELECT * FROM ${this.tableName} ${condition} LIMIT ? OFFSET ?`;
		values.push(limit, offset);
		const [rows] = await readDb.query(sql, values);
		return rows;
	}

	async insert (data) {
		const keys = Object.keys(data);
		const columns = keys.join(',');
		const values = keys.map(() => '?').join(',');
		const sql = `INSERT INTO ${this.tableName} (${columns}) VALUES (${values})`;
		const [result] = await writeDb.query(sql, Object.values(data));
		return result;
	}
	

	async update (id, data) {
		const keys = Object.keys(data);
		const updateValues = keys.map(key => `${key} = ?`).join(',');
		const sql = `UPDATE ${this.tableName} SET ${updateValues} WHERE id = ?`;
		const values = [...Object.values(data), id];
		const [result] = await writeDb.query(sql, values);
		return result;
	}

	async delete (id) {
		const sql = `DELETE FROM ${this.tableName} WHERE id = ?`;
		const [result] = await writeDb.query(sql, [id]);
		return result;
	}

	async count (options) {
		let condition = '';
		let values = [];

		if (options) {
			condition = 'WHERE ' + Object.keys(options).map(key => `${key} = ?`).join(' AND ');
			values = Object.values(options);
		}

		const sql = `SELECT COUNT(*) AS count FROM ${this.tableName} ${condition}`;
		const [rows] = await readDb.query(sql, values);
		return rows[0].count;
	}

	async updateMany (condition, data) {
		const updateValues = Object.keys(data).map(key => `${key} = ?`).join(',');
		const conditionValues = Object.values(condition);
		const sql = `UPDATE ${this.tableName} SET ${updateValues} WHERE ${Object.keys(condition).map(key => `${key} = ?`).join(' AND ')}`;
		const [result] = await writeDb.query(sql, [...Object.values(data), ...conditionValues]);
		return result;
	}

	async deleteMany (condition) {
		const conditionValues = Object.values(condition);
		const sql = `DELETE FROM ${this.tableName} WHERE ${Object.keys(condition).map(key => `${key} = ?`).join(' AND ')}`;
		const [result] = await writeDb.query(sql, conditionValues);
		return result;
	}
}

module.exports = BaseModel;
