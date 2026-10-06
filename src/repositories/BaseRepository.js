import { pool } from '../config/database.js';

export class BaseRepository {
  #tableName;

  constructor(tableName) {
    this.#tableName = tableName;
  }

  async create(data) {
    const keys = Object.keys(data).join(', ');
    const placeholders = Object.keys(data).map(() => '?').join(', ');
    const values = Object.values(data);
    const sql = `INSERT INTO ${this.#tableName} (${keys}) VALUES (${placeholders})`;
    const [result] = await pool.execute(sql, values);
    return result.insertId;
  }

  async findAll() {
    const [rows] = await pool.query(`SELECT * FROM ${this.#tableName}`);
    return rows;
  }

  async findById(id) {
    const [rows] = await pool.execute(`SELECT * FROM ${this.#tableName} WHERE id = ?`, [id]);
    return rows[0] || null;
  }

  async update(id, data) {
    const fields = Object.keys(data).map(key => `${key} = ?`).join(', ');
    const values = [...Object.values(data), id];
    const sql = `UPDATE ${this.#tableName} SET ${fields} WHERE id = ?`;
    const [result] = await pool.execute(sql, values);
    return result.affectedRows > 0;
  }

  async delete(id) {
    const [result] = await pool.execute(`DELETE FROM ${this.#tableName} WHERE id = ?`, [id]);
    return result.affectedRows > 0;
  }
}