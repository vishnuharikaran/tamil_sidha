const express = require('express');
const {
  submitContactMessage,
  getContactMessages,
  markMessageRead,
} = require('../controllers/contactController');
const { authenticateAdmin } = require('../middleware/auth');
const { validateBody, contactMessageSchema } = require('../middleware/validation');

const router = express.Router();

// Public route to submit contact form
router.post('/', validateBody(contactMessageSchema), submitContactMessage);
router.post('/submit', validateBody(contactMessageSchema), submitContactMessage); // alias for backwards compatibility

// Protected admin routes
router.get('/', authenticateAdmin, getContactMessages);
router.patch('/:id/read', authenticateAdmin, markMessageRead);

module.exports = router;
