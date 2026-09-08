const express = require('express');
const {
  getAppointments,
  getAppointmentById,
  createAppointment,
  getAvailableSlots,
  updateAppointmentStatus,
  deleteAppointment,
} = require('../controllers/appointmentController');
const { authenticateAdmin } = require('../middleware/auth');
const { validateBody, appointmentBookingSchema, appointmentStatusSchema } = require('../middleware/validation');

const router = express.Router();

// Public routes
router.post('/', validateBody(appointmentBookingSchema), createAppointment);
router.post('/book', validateBody(appointmentBookingSchema), createAppointment); // alias for backwards compatibility
router.get('/slots/:date', getAvailableSlots);

// Protected admin routes
router.get('/', authenticateAdmin, getAppointments);
router.get('/:id', authenticateAdmin, getAppointmentById);
router.patch('/:id/status', authenticateAdmin, validateBody(appointmentStatusSchema), updateAppointmentStatus);
router.delete('/:id', authenticateAdmin, deleteAppointment);

module.exports = router;
