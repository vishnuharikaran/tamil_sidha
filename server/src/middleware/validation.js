const { z } = require('zod');
const { sendError } = require('../utils/response');

const validateBody = (schema) => (req, res, next) => {
  try {
    req.body = schema.parse(req.body);
    next();
  } catch (err) {
    if (err instanceof z.ZodError) {
      const issueMessages = err.errors.map(e => `${e.path.join('.')}: ${e.message}`).join(', ');
      return sendError(res, `Validation Error: ${issueMessages}`, 400);
    }
    return sendError(res, err.message, 400);
  }
};

// Zod Schemas
const loginSchema = z.object({
  email: z.string().email('Invalid email address'),
  password: z.string().min(6, 'Password must be at least 6 characters'),
});

const appointmentBookingSchema = z.object({
  patientId: z.string().optional(),
  patientName: z.string().min(2, 'Patient name is required'),
  phone: z.string().min(8, 'Phone number must be at least 8 digits'),
  age: z.union([z.number(), z.string()]).optional(),
  gender: z.string().optional(),
  date: z.string().refine((val) => !isNaN(Date.parse(val)), { message: 'Invalid date format' }),
  timeSlot: z.string().min(1, 'Time slot is required'),
  reason: z.string().min(3, 'Reason for visit is required'),
  notes: z.string().optional(),
});

const appointmentStatusSchema = z.object({
  status: z.enum(['PENDING', 'CONFIRMED', 'COMPLETED', 'CANCELLED'], {
    errorMap: () => ({ message: 'Status must be PENDING, CONFIRMED, COMPLETED, or CANCELLED' }),
  }),
  notes: z.string().optional(),
});

const patientSchema = z.object({
  name: z.string().min(2, 'Name is required'),
  age: z.union([z.number(), z.string()]).transform((val) => parseInt(val, 10)),
  gender: z.string().min(1, 'Gender is required'),
  phone: z.string().min(8, 'Phone number is required'),
  email: z.string().email('Invalid email').optional().nullable().or(z.literal('')),
  address: z.string().optional().nullable(),
  bloodGroup: z.string().optional().nullable(),
});

const prescriptionItemSchema = z.object({
  formulation: z.enum(['CHOORNAM', 'KUDINEER', 'THAILAM', 'LEHYAM']),
  medicineName: z.string().min(1, 'Medicine name required'),
  dosage: z.string().min(1, 'Dosage required'),
  duration: z.string().min(1, 'Duration required'),
  instructions: z.string().optional().nullable(),
});

const medicalRecordSchema = z.object({
  patientId: z.string().min(1, 'Patient ID is required'),
  appointmentId: z.string().optional().nullable(),
  visitDate: z.string().optional().nullable(),
  naadi: z.enum(['VATHAM', 'PITHAM', 'KAPHAM', 'VATHAM_PITHAM', 'PITHAM_KAPHAM', 'VATHAM_KAPHAM', 'THINAI']),
  naadiFinding: z.string().optional().nullable(),
  neerkuri: z.string().optional().nullable(),
  neikkuri: z.string().optional().nullable(),
  ennVagai: z.any().optional(),
  diagnosis: z.string().min(2, 'Diagnosis is required'),
  followUpDate: z.string().optional().nullable(),
  prescriptions: z.array(prescriptionItemSchema).optional(),
});

const inventorySchema = z.object({
  medicineName: z.string().min(2, 'Medicine name is required'),
  formulation: z.enum(['CHOORNAM', 'KUDINEER', 'THAILAM', 'LEHYAM']),
  quantity: z.union([z.number(), z.string()]).transform((val) => parseFloat(val)),
  unit: z.string().min(1, 'Unit is required'),
  reorderLevel: z.union([z.number(), z.string()]).transform((val) => parseFloat(val)).optional(),
});

const contactMessageSchema = z.object({
  name: z.string().min(2, 'Name is required'),
  phone: z.string().min(8, 'Phone number is required'),
  email: z.string().email('Invalid email').optional().nullable().or(z.literal('')),
  message: z.string().min(5, 'Message must be at least 5 characters'),
});

module.exports = {
  validateBody,
  loginSchema,
  appointmentBookingSchema,
  appointmentStatusSchema,
  patientSchema,
  medicalRecordSchema,
  inventorySchema,
  contactMessageSchema,
};
