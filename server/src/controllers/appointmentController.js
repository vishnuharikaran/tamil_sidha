const prisma = require('../config/db');
const { sendSuccess, sendError } = require('../utils/response');
const { validateAppointmentBooking, generate30MinSlotsForDate } = require('../utils/slotUtils');

const getAppointments = async (req, res) => {
  try {
    const { status, date, search } = req.query;
    const where = {};

    if (status) {
      where.status = status;
    }

    if (date) {
      const startDate = new Date(date);
      startDate.setHours(0, 0, 0, 0);
      const endDate = new Date(date);
      endDate.setHours(23, 59, 59, 999);
      where.date = { gte: startDate, lte: endDate };
    }

    if (search) {
      where.patient = {
        OR: [
          { name: { contains: search, mode: 'insensitive' } },
          { phone: { contains: search, mode: 'insensitive' } },
        ],
      };
    }

    const appointments = await prisma.appointment.findMany({
      where,
      orderBy: { date: 'desc' },
      include: {
        patient: true,
        record: true,
      },
    });

    return sendSuccess(res, appointments, 'Appointments retrieved successfully');
  } catch (err) {
    console.error('getAppointments error:', err);
    return sendError(res, 'Failed to fetch appointments', 500);
  }
};

const getAppointmentById = async (req, res) => {
  try {
    const { id } = req.params;
    const appointment = await prisma.appointment.findUnique({
      where: { id },
      include: {
        patient: true,
        record: {
          include: { prescriptions: true },
        },
      },
    });

    if (!appointment) {
      return sendError(res, 'Appointment not found', 404);
    }

    return sendSuccess(res, appointment, 'Appointment details retrieved');
  } catch (err) {
    return sendError(res, 'Failed to fetch appointment details', 500);
  }
};

const createAppointment = async (req, res) => {
  try {
    const { patientId, patientName, phone, age, gender, date, timeSlot, reason, notes } = req.body;

    // Validate date & operating hours (including Sunday 11-13 check & past date check)
    const slotValidation = validateAppointmentBooking(date, timeSlot);
    if (!slotValidation.valid) {
      return sendError(res, slotValidation.error, 400);
    }

    let targetPatientId = patientId;

    // Auto-create or find patient if not provided
    if (!targetPatientId) {
      if (!patientName || !phone) {
        return sendError(res, 'Patient name and phone number are required for booking.', 400);
      }

      let patient = await prisma.patient.findFirst({
        where: { phone: phone.trim() },
      });

      if (!patient) {
        patient = await prisma.patient.create({
          data: {
            name: patientName.trim(),
            phone: phone.trim(),
            age: age ? parseInt(age, 10) : 30,
            gender: gender || 'Unspecified',
          },
        });
      }
      targetPatientId = patient.id;
    }

    const appointment = await prisma.appointment.create({
      data: {
        patientId: targetPatientId,
        date: new Date(date),
        timeSlot: timeSlot.trim(),
        reason: reason.trim(),
        notes: notes ? notes.trim() : null,
        status: 'PENDING',
      },
      include: {
        patient: true,
      },
    });

    return sendSuccess(res, appointment, 'Appointment booked successfully', 201);
  } catch (err) {
    console.error('createAppointment error:', err);
    return sendError(res, 'Failed to create appointment', 500);
  }
};

const getAvailableSlots = async (req, res) => {
  try {
    const { date } = req.params;
    const targetDate = new Date(date);

    if (isNaN(targetDate.getTime())) {
      return sendError(res, 'Invalid date parameter', 400);
    }

    // Generate all 30-min slots based on day of week
    const allSlots = generate30MinSlotsForDate(targetDate);

    // Query booked appointments for that date (excluding cancelled)
    const startDate = new Date(targetDate);
    startDate.setHours(0, 0, 0, 0);
    const endDate = new Date(targetDate);
    endDate.setHours(23, 59, 59, 999);

    const bookedAppointments = await prisma.appointment.findMany({
      where: {
        date: { gte: startDate, lte: endDate },
        status: { not: 'CANCELLED' },
      },
      select: { timeSlot: true },
    });

    const bookedSlotsSet = new Set(bookedAppointments.map(a => a.timeSlot.trim().toUpperCase()));

    const slots = allSlots.map(slot => ({
      slot,
      isAvailable: !bookedSlotsSet.has(slot.toUpperCase()),
    }));

    return sendSuccess(
      res,
      {
        date: targetDate.toISOString().split('T')[0],
        totalSlots: slots.length,
        availableCount: slots.filter(s => s.isAvailable).length,
        slots,
      },
      'Available slots retrieved'
    );
  } catch (err) {
    console.error('getAvailableSlots error:', err);
    return sendError(res, 'Failed to fetch available slots', 500);
  }
};

const updateAppointmentStatus = async (req, res) => {
  try {
    const { id } = req.params;
    const { status, notes } = req.body;

    const appointment = await prisma.appointment.update({
      where: { id },
      data: {
        status,
        notes: notes !== undefined ? notes : undefined,
      },
      include: {
        patient: true,
      },
    });

    return sendSuccess(res, appointment, `Appointment status updated to ${status}`);
  } catch (err) {
    return sendError(res, 'Failed to update appointment status', 500);
  }
};

const deleteAppointment = async (req, res) => {
  try {
    const { id } = req.params;
    await prisma.appointment.delete({ where: { id } });
    return sendSuccess(res, null, 'Appointment deleted successfully');
  } catch (err) {
    return sendError(res, 'Failed to delete appointment', 500);
  }
};

module.exports = {
  getAppointments,
  getAppointmentById,
  createAppointment,
  getAvailableSlots,
  updateAppointmentStatus,
  deleteAppointment,
};
