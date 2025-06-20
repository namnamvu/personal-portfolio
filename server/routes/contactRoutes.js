import express from 'express';
import {
  createContact,
  getAllContacts,
  markAsRead,
  markAsReplied,
  deleteContact,
  updateContact
} from '../controllers/contactController.js';

const router = express.Router();
router.use((req, res, next) => {
    console.log(`[Incoming] ${req.method} ${req.originalUrl}`);
    next();
  });
// Public route - anyone can submit contact form
router.post('/', createContact);

// Admin routes - you'll want to add auth middleware here later
router.get('/', getAllContacts);
router.patch('/:contactId/read', markAsRead);
router.patch('/:contactId/replied', markAsReplied);
router.patch('/:contactId', updateContact);
router.delete('/:contactId', deleteContact);


// For testing AppError and globalErrorHandler
router.get('/test-error', (req, res, next) => {
    throw new AppError('This is a test error from /test-error route!', 400);
  });

export default router;
  