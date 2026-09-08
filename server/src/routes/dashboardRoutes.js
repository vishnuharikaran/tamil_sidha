const express = require('express');
const { getDashboardStats } = require('../controllers/statsController');
const { authenticateAdmin } = require('../middleware/auth');

const router = express.Router();

router.use(authenticateAdmin);

router.get('/stats', getDashboardStats);

module.exports = router;
