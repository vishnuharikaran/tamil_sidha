const prisma = require('../config/db');
const { sendSuccess, sendError } = require('../utils/response');

const getMedicalRecords = async (req, res) => {
  try {
    const { patientId } = req.query;
    const where = patientId ? { patientId } : {};

    const records = await prisma.medicalRecord.findMany({
      where,
      orderBy: { visitDate: 'desc' },
      include: {
        patient: true,
        appointment: true,
        prescriptions: true,
      },
    });

    return sendSuccess(res, records, 'Medical records retrieved');
  } catch (err) {
    console.error('getMedicalRecords error:', err);
    return sendError(res, 'Failed to fetch medical records', 500);
  }
};

const getRecordById = async (req, res) => {
  try {
    const { id } = req.params;
    const record = await prisma.medicalRecord.findUnique({
      where: { id },
      include: {
        patient: true,
        appointment: true,
        prescriptions: true,
      },
    });

    if (!record) {
      return sendError(res, 'Medical record not found', 404);
    }

    return sendSuccess(res, record, 'Medical record details retrieved');
  } catch (err) {
    return sendError(res, 'Failed to fetch medical record', 500);
  }
};

const getRecordsByPatient = async (req, res) => {
  try {
    const { id } = req.params;

    const records = await prisma.medicalRecord.findMany({
      where: { patientId: id },
      orderBy: { visitDate: 'desc' },
      include: {
        appointment: true,
        prescriptions: true,
      },
    });

    return sendSuccess(res, records, 'Patient EHR records retrieved');
  } catch (err) {
    return sendError(res, 'Failed to fetch patient records', 500);
  }
};

const createMedicalRecord = async (req, res) => {
  try {
    const {
      patientId,
      appointmentId,
      visitDate,
      naadi,
      naadiFinding,
      neerkuri,
      neikkuri,
      ennVagai,
      diagnosis,
      followUpDate,
      prescriptions,
    } = req.body;

    const record = await prisma.medicalRecord.create({
      data: {
        patientId,
        appointmentId: appointmentId || null,
        visitDate: visitDate ? new Date(visitDate) : new Date(),
        naadi,
        naadiFinding: naadiFinding || null,
        neerkuri: neerkuri || null,
        neikkuri: neikkuri || null,
        ennVagai: ennVagai || null,
        diagnosis,
        followUpDate: followUpDate ? new Date(followUpDate) : null,
        prescriptions: prescriptions && prescriptions.length > 0 ? {
          create: prescriptions.map((p) => ({
            formulation: p.formulation,
            medicineName: p.medicineName,
            dosage: p.dosage,
            duration: p.duration,
            instructions: p.instructions || null,
          })),
        } : undefined,
      },
      include: {
        patient: true,
        prescriptions: true,
      },
    });

    // Automatically mark appointment COMPLETED if linked
    if (appointmentId) {
      await prisma.appointment.update({
        where: { id: appointmentId },
        data: { status: 'COMPLETED' },
      }).catch(() => {});
    }

    return sendSuccess(res, record, 'Medical record & prescriptions saved successfully', 201);
  } catch (err) {
    console.error('createMedicalRecord error:', err);
    return sendError(res, 'Failed to create medical record', 500);
  }
};

const updateMedicalRecord = async (req, res) => {
  try {
    const { id } = req.params;
    const {
      naadi,
      naadiFinding,
      neerkuri,
      neikkuri,
      ennVagai,
      diagnosis,
      followUpDate,
      prescriptions,
    } = req.body;

    if (prescriptions) {
      await prisma.prescription.deleteMany({ where: { recordId: id } });
    }

    const record = await prisma.medicalRecord.update({
      where: { id },
      data: {
        naadi,
        naadiFinding,
        neerkuri,
        neikkuri,
        ennVagai,
        diagnosis,
        followUpDate: followUpDate ? new Date(followUpDate) : null,
        prescriptions: prescriptions ? {
          create: prescriptions.map((p) => ({
            formulation: p.formulation,
            medicineName: p.medicineName,
            dosage: p.dosage,
            duration: p.duration,
            instructions: p.instructions || null,
          })),
        } : undefined,
      },
      include: {
        patient: true,
        prescriptions: true,
      },
    });

    return sendSuccess(res, record, 'Medical record updated successfully');
  } catch (err) {
    return sendError(res, 'Failed to update medical record', 500);
  }
};

module.exports = {
  getMedicalRecords,
  getRecordById,
  getRecordsByPatient,
  createMedicalRecord,
  updateMedicalRecord,
};
