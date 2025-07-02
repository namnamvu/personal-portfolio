// test/Contacts.test.js
import { describe, it, expect, vi, afterEach } from 'vitest';
import { Contact } from '../models/Contact.js';

// Mock the PostgreSQL pool
vi.mock('../config/database.js', () => ({
  default: {
    query: vi.fn(),
  },
}));

import pool from '../config/database.js';

describe('Contact Model', () => {
  afterEach(() => {
    vi.clearAllMocks();
  });

  describe('create', () => {
    it('should insert a new contact and return it', async () => {
      const mockRow = { name: 'Nam', email: 'whatever@example.com' };
      pool.query.mockResolvedValue({ rows: [mockRow] });

      const result = await Contact.create({
        name: 'Nam',
        email: 'whatever@example.com',
        subject: 'Hey',
        message: 'I love drinking water',
      });

      expect(pool.query).toHaveBeenCalledWith(
        expect.stringContaining('INSERT INTO contacts'),
        ['Nam', 'whatever@example.com', 'Hey', 'I love drinking water']
      );
      expect(result).toEqual(mockRow);
    });
  });

  describe('findAll', () => {
    it('should return all contacts', async () => {
      const mockRows = [{ id: 1 }, { id: 2 }];
      pool.query.mockResolvedValue({ rows: mockRows });

      const result = await Contact.findAll();
      expect(result).toEqual(mockRows);
    });
  });

  describe('update', () => {
    it('should update the contact with given fields and return updated row', async () => {
      const mockRow = { contact_id: 1, name: 'Kurosaki', subject: 'Updated Subject' };
      pool.query.mockResolvedValue({ rows: [mockRow] });
  
      const result = await Contact.update(1, { name: 'Kurosaki', subject: 'Updated Subject' });
  
      expect(pool.query).toHaveBeenCalledWith(
        expect.stringContaining('UPDATE contacts SET'),
        [1, 'Kurosaki', 'Updated Subject']
      );
      expect(result).toEqual(mockRow);
    });
  
    it('should throw VALIDATION_ERROR if no fields provided', async () => {
      await expect(Contact.update(1, {})).rejects.toThrow('No fields provided for update');
    });
  
    it('should throw NOT_FOUND if no contact was updated', async () => {
      pool.query.mockResolvedValue({ rows: [] });
  
      await expect(Contact.update(999, { name: 'Ghost' })).rejects.toThrow('Contact not found');
    });
  });
  

  describe('markAsRead', () => {
    it('should update read status and return updated row', async () => {
      const mockRow = { contact_id: 1, read: true };
      pool.query.mockResolvedValue({ rows: [mockRow] });

      const result = await Contact.markAsRead(1);
      expect(result).toEqual(mockRow);
    });

    it('should throw if no contact is found', async () => {
      pool.query.mockResolvedValue({ rows: [] });

      await expect(Contact.markAsRead(999)).rejects.toThrow('Contact not found');
    });
  });

  describe('markAsReplied', () => {
    it('should update replied status and return updated row', async () => {
      const mockRow = { contact_id: 1, replied: true };
      pool.query.mockResolvedValue({ rows: [mockRow] });

      const result = await Contact.markAsReplied(1);
      expect(result).toEqual(mockRow);
    });

    it('should throw if no contact is found', async () => {
      pool.query.mockResolvedValue({ rows: [] });

      await expect(Contact.markAsReplied(999)).rejects.toThrow('Contact not found');
    });
  });

  describe('delete', () => {
    it('should delete the contact and return the deleted row', async () => {
      const mockRow = { contact_id: 1 };
      pool.query.mockResolvedValue({ rows: [mockRow] });

      const result = await Contact.delete(1);
      expect(result).toEqual(mockRow);
    });

    it('should throw if no contact is found', async () => {
      pool.query.mockResolvedValue({ rows: [] });

      await expect(Contact.delete(999)).rejects.toThrow('Contact not found');
    });
  });
});
