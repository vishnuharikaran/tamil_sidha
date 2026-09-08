const express = require('express');
const {
  getMedicalRecords,
  getRecordById,
  getRecordsByPatient,
  createMedicalRecord,
  updateMedicalRecord,
} = require('../controllers/recordController');
const { authenticateAdmin } = require('../middleware/auth');
const { validateBody, medicalRecordSchema } = require('../middleware/validation');

const router = express.Router();

router.use(authenticateAdmin);

router.post('/', validateBody(medicalRecordSchema), createMedicalRecord);
router.get('/', getMedicalRecords);
router.get('/:id', getRecordById);
router.put('/:id', validateBody(medicalRecordSchema), updateMedicalRecord);
router.get('/patient/:id', getRecordsByPatient);

module.exports = router;
