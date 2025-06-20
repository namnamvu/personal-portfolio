// models/Contact.js
import pool from '../config/database.js';
import { errors } from '../utils/AppError.js';

export class Contact {
  static async create({ name, email, subject, message }) {
    const result = await pool.query(
      `INSERT INTO contacts (name, email, subject, message) 
       VALUES ($1, $2, $3, $4)  
       RETURNING *`,
      [name, email, subject, message]
    );
    return result.rows[0];
  }

  static async findAll() {
    const result = await pool.query('SELECT * FROM contacts ORDER BY created_at DESC');
    return result.rows;
  }

  static async update(contactId, updates) {
    const fields = Object.keys(updates);
    if (fields.length === 0) {
      throw errors.VALIDATION_ERROR('No fields provided for update');
    }
    const setClause = fields.map((key, idx) => `${key} = $${idx + 2}`).join(', ');
    const values = [contactId, ...fields.map((key) => updates[key])];

    const result = await pool.query(
      `UPDATE contacts SET ${setClause} WHERE contact_id = $1 RETURNING *`,
      values
    );
    if (result.rows.length === 0) {
      throw errors.NOT_FOUND('Contact not found');
    }
    return result.rows[0];
  }

  static async markAsRead(contactId) {
    const result = await pool.query(
      'UPDATE contacts SET read = true WHERE contact_id = $1 RETURNING *',
      [contactId]
    );
    if (result.rows.length === 0) {
      throw errors.NOT_FOUND('Contact not found');
    }
    return result.rows[0];
  }

  static async markAsReplied(contactId) {
    const result = await pool.query(
      'UPDATE contacts SET replied = true WHERE contact_id = $1 RETURNING *',
      [contactId]
    );
    if (result.rows.length === 0) {
      throw errors.NOT_FOUND('Contact not found');
    }
    return result.rows[0];
  }

  static async delete(contactId) {
    const result = await pool.query(
      'DELETE FROM contacts WHERE contact_id = $1 RETURNING *',
      [contactId]
    );
    if (result.rows.length === 0) {
      throw errors.NOT_FOUND('Contact not found');
    }
    return result.rows[0];
  }
}

export default Contact;
