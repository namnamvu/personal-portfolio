import pool from '../config/database.js';
import AppError from '../utils/AppError.js';

export class Contact {
  // Create new contact from form
  static async create({ name, email, subject, message }) {
    const result = await pool.query(
      `INSERT INTO contacts (name, email, subject, message) 
       VALUES ($1, $2, $3, $4) 
       RETURNING *`,
      [name, email, subject, message]
    );

    return result.rows[0];
  }

  // Get all contacts (for your admin view)
  static async findAll() {
    const result = await pool.query(
      'SELECT * FROM contacts ORDER BY created_at DESC'
    );

    return result.rows;
  }

  // Mark as read
  static async markAsRead(contactId) {
    const result = await pool.query(
      'UPDATE contacts SET read = true WHERE contact_id = $1 RETURNING *',
      [contactId]
    );

    if (result.rows.length === 0) {
      throw AppError.NOT_FOUND('Contact not found');
    }

    return result.rows[0];
  }

  // Mark as replied
  static async markAsReplied(contactId) {
    const result = await pool.query(
      'UPDATE contacts SET replied = true WHERE contact_id = $1 RETURNING *',
      [contactId]
    );

    if (result.rows.length === 0) {
      throw AppError.NOT_FOUND('Contact not found');
    }

    return result.rows[0];
  }

  // Delete contact
  static async delete(contactId) {
    const result = await pool.query(
      'DELETE FROM contacts WHERE contact_id = $1 RETURNING *',
      [contactId]
    );

    if (result.rows.length === 0) {
      throw AppError.NOT_FOUND('Contact not found');
    }

    return result.rows[0];
  }
}

export default Contact;