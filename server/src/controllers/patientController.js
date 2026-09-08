const prisma = require('../config/db');
const { sendSuccess, sendError } = require('../utils/response');

const getPatients = async (req, res) => {
  try {
    const { search } = req.query;
    const where = search
      ? {
          OR: [
            { name: { contains: search, mode: 'insensitive' } },
            { phone: { contains: search, mode: 'insensitive' } },
          ],
        }
      : {};

    const patients = await prisma.patient.findMany({
      where,
      orderBy: { createdAt: 'desc' },
      include: {
        appointments: { orderBy: { date: 'desc' }, take: 5 },
        records: { orderBy: { visitDate: 'desc' }, take: 5 },
      },
    });

    return sendSuccess(res, patients, 'Patients retrieved successfully');
  } catch (err) {
    console.error('getPatients error:', err);
    return sendError(res, 'Failed to fetch patients', 500);
  }
};

const getPatientById = async (req, res) => {
  try {
    const { id } = req.params;
    const patient = await prisma.patient.findUnique({
      where: { id },
      include: {
        appointments: { orderBy: { date: 'desc' } },
        records: {
          orderBy: { visitDate: 'desc' },
          include: { prescriptions: true },
        },
      },
    });

    if (!patient) {
      return sendError(res, 'Patient not found', 404);
    }

    return sendSuccess(res, patient, 'Patient profile retrieved');
  } catch (err) {
    return sendError(res, 'Failed to fetch patient details', 500);
  }
};

const createPatient = async (req, res) => {
  try {
    const { name, age, gender, phone, email, address, bloodGroup } = req.body;

    const patient = await prisma.patient.create({
      data: {
        name,
        age,
        gender,
        phone,
        email: email || null,
        address: address || null,
        bloodGroup: bloodGroup || null,
      },
    });

    return sendSuccess(res, patient, 'Patient registered successfully', 201);
  } catch (err) {
    console.error('createPatient error:', err);
    return sendError(res, 'Failed to register patient', 500);
  }
};

const updatePatient = async (req, res) => {
  try {
    const { id } = req.params;
    const { name, age, gender, phone, email, address, bloodGroup } = req.body;

    const patient = await prisma.patient.update({
      where: { id },
      data: {
        name,
        age,
        gender,
        phone,
        email: email !== undefined ? email : undefined,
        address: address !== undefined ? address : undefined,
        bloodGroup: bloodGroup !== undefined ? bloodGroup : undefined,
      },
    });

    return sendSuccess(res, patient, 'Patient details updated successfully');
  } catch (err) {
    return sendError(res, 'Failed to update patient details', 500);
  }
};

const getPatientHistory = async (req, res) => {
  try {
    const { id } = req.params;

    const patient = await prisma.patient.findUnique({
      where: { id },
      select: { id: true, name: true, phone: true, age: true, gender: true, bloodGroup: true },
    });

    if (!patient) {
      return sendError(res, 'Patient not found', 404);
    }

    const appointments = await prisma.appointment.findMany({
      where: { patientId: id },
      orderBy: { date: 'desc' },
    });

    const medicalRecords = await prisma.medicalRecord.findMany({
      where: { patientId: id },
      orderBy: { visitDate: 'desc' },
      include: {
        prescriptions: true,
        appointment: true,
      },
    });

    return sendSuccess(
      res,
      {
        patient,
        totalVisits: appointments.length,
        appointments,
        medicalRecords,
      },
      'Full patient visit history retrieved'
    );
  } catch (err) {
    console.error('getPatientHistory error:', err);
    return sendError(res, 'Failed to fetch patient history', 500);
  }
};

const deletePatient = async (req, res) => {
  try {
    const { id } = req.params;
    await prisma.patient.delete({ where: { id } });
    return sendSuccess(res, null, 'Patient deleted successfully');
  } catch (err) {
    return sendError(res, 'Failed to delete patient', 500);
  }
};

module.exports = {
  getPatients,
  getPatientById,
  createPatient,
  updatePatient,
  getPatientHistory,
  deletePatient,
};
