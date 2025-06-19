import express from 'express'

const router = express.Router();

router.get('/api/contacts', getAllContacts());
export default router;