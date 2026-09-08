const express = require('express');
const CLINIC = require('../config/clinic');

const router = express.Router();

router.get('/', (req, res) => {
  res.json(CLINIC);
});

module.exports = router;
