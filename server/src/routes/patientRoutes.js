const express = require('express');
const {
  getPatients,
  getPatientById,
  createPatient,
  updatePatient,
  getPatientHistory,
  deletePatient,
} = require('../controllers/patientController');
const { authenticateAdmin } = require('../middleware/auth');
const { validateBody, patientSchema } = require('../middleware/validation');

const router = express.Router();

router.use(authenticateAdmin);

router.post('/', validateBody(patientSchema), createPatient);
router.get('/', getPatients);
router.get('/:id', getPatientById);
router.put('/:id', validateBody(patientSchema), updatePatient);
router.get('/:id/history', getPatientHistory);
router.delete('/:id', deletePatient);

module.exports = router;
