const express = require('express');
const { login, logout, getMe } = require('../controllers/authController');
const { authenticateAdmin } = require('../middleware/auth');
const { validateBody, loginSchema } = require('../middleware/validation');

const router = express.Router();

router.post('/login', validateBody(loginSchema), login);
router.post('/logout', logout);
router.get('/me', authenticateAdmin, getMe);

module.exports = router;
