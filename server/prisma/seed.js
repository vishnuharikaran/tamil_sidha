const { PrismaClient } = require('@prisma/client');
const bcrypt = require('bcryptjs');

const prisma = new PrismaClient();

async function main() {
  console.log('🌱 Starting Tamil Siddha Clinic database seed...');

  // Clean existing data
  await prisma.prescription.deleteMany({});
  await prisma.medicalRecord.deleteMany({});
  await prisma.appointment.deleteMany({});
  await prisma.patient.deleteMany({});
  await prisma.inventory.deleteMany({});
  await prisma.admin.deleteMany({});
  await prisma.contactMessage.deleteMany({});

  // 1. Create Admin Account
  const passwordHash = await bcrypt.hash('Admin@1234', 10);
  const admin = await prisma.admin.create({
    data: {
      email: 'admin@tamilsiddhaclinic.com',
      passwordHash,
    },
  });
  console.log('✅ Created Admin user:', admin.email);

  // 2. Create 5 Sample Patients with Tamil Names
  const patientsData = [
    {
      name: 'Murugan Selvan',
      age: 42,
      gender: 'Male',
      phone: '+919842154321',
      email: 'murugan.selvan@gmail.com',
      address: '45 South Street, Viluppuram, Tamil Nadu 605401',
      bloodGroup: 'O+',
    },
    {
      name: 'Kavitha Ramalingam',
      age: 36,
      gender: 'Female',
      phone: '+919750123890',
      email: 'kavitha.r@yahoo.com',
      address: '12 Temple View Road, Cuddalore, Tamil Nadu 607001',
      bloodGroup: 'A+',
    },
    {
      name: 'Anbuselvan Palanivel',
      age: 58,
      gender: 'Male',
      phone: '+919443219876',
      email: 'anbu.palanivel@gmail.com',
      address: '88 Market Lane, Tindivanam, Tamil Nadu 604001',
      bloodGroup: 'B+',
    },
    {
      name: 'Sundari Vadivelu',
      age: 29,
      gender: 'Female',
      phone: '+919944567812',
      email: 'sundari.v@gmail.com',
      address: '77 Anna Nagar, Viluppuram, Tamil Nadu 605403',
      bloodGroup: 'AB+',
    },
    {
      name: 'Senthamizh Chelvan',
      age: 50,
      gender: 'Male',
      phone: '+919629876543',
      email: 'senthamizh.c@outlook.com',
      address: '14 Periyar Street, Pondicherry 605001',
      bloodGroup: 'O-',
    },
  ];

  const createdPatients = [];
  for (const p of patientsData) {
    const created = await prisma.patient.create({ data: p });
    createdPatients.push(created);
  }
  console.log(`✅ Created ${createdPatients.length} sample patients.`);

  // 3. Create Sample Appointments in Various Statuses
  const today = new Date();
  const tomorrow = new Date(today);
  tomorrow.setDate(today.getDate() + 1);

  const yesterday = new Date(today);
  yesterday.setDate(today.getDate() - 1);

  const appointmentsData = [
    {
      patientId: createdPatients[0].id,
      date: yesterday,
      timeSlot: '10:00 AM',
      reason: 'Kidney Stone Consultation & Severe Backache',
      status: 'COMPLETED',
      notes: 'Patient responded well to Amukkara Choornam.',
    },
    {
      patientId: createdPatients[1].id,
      date: today,
      timeSlot: '11:30 AM',
      reason: 'Uterine Fibroids & Irregular Cycles',
      status: 'CONFIRMED',
      notes: 'Scheduled for Naadi examination.',
    },
    {
      patientId: createdPatients[2].id,
      date: tomorrow,
      timeSlot: '04:00 PM',
      reason: 'Chronic Joint Pain & High Blood Pressure',
      status: 'PENDING',
      notes: 'First time visit.',
    },
    {
      patientId: createdPatients[3].id,
      date: tomorrow,
      timeSlot: '05:30 PM',
      reason: 'Long-standing Skin Allergies',
      status: 'PENDING',
      notes: 'Allergic to specific foods.',
    },
    {
      patientId: createdPatients[4].id,
      date: yesterday,
      timeSlot: '06:00 PM',
      reason: 'Diabetes Management Follow-up',
      status: 'CANCELLED',
      notes: 'Rescheduled by patient due to travel.',
    },
  ];

  const createdAppointments = [];
  for (const app of appointmentsData) {
    const created = await prisma.appointment.create({ data: app });
    createdAppointments.push(created);
  }
  console.log(`✅ Created ${createdAppointments.length} sample appointments.`);

  // Create Medical Record for completed appointment
  const record = await prisma.medicalRecord.create({
    data: {
      patientId: createdPatients[0].id,
      appointmentId: createdAppointments[0].id,
      visitDate: yesterday,
      naadi: 'PITHAM_KAPHAM',
      naadiFinding: 'Elevated Pitham indicating internal heat and renal congestion.',
      neerkuri: 'Clear amber color, slight cloudiness',
      neikkuri: 'Oil droplet spreads into pearl ring shape (Pitha-Kapha imbalance)',
      ennVagai: {
        Tongue: 'Coated pale yellow',
        Skin: 'Dryness observed',
        Color: 'Normal complexion',
        Voice: 'Clear and firm',
        Eyes: 'Mild conjunctival redness',
        Stool: 'Regular, mild constipation',
        Urine: 'Amber yellow with mild turbidity',
        Pulse: '78 bpm, Pitham dominant',
      },
      diagnosis: 'Renal Calculi (Kidney Stones) with Pitha-Kapha aggravation',
      followUpDate: new Date(today.getTime() + 14 * 24 * 60 * 60 * 1000),
      prescriptions: {
        create: [
          {
            formulation: 'KUDINEER',
            medicineName: 'Nandukkal Kudineer',
            dosage: '50ml twice daily before food',
            duration: '15 Days',
            instructions: 'Boil 10g powder in 200ml water until reduced to 50ml.',
          },
          {
            formulation: 'CHOORNAM',
            medicineName: 'Amukkara Choornam',
            dosage: '2g with warm milk at bedtime',
            duration: '15 Days',
            instructions: 'Helps balance Kapha and relieve pain.',
          },
        ],
      },
    },
  });
  console.log('✅ Created sample medical record & prescription.');

  // 4. Create 10 Inventory Items across all 4 formulations with realistic Siddha names
  const inventoryData = [
    {
      medicineName: 'Amukkara Choornam',
      formulation: 'CHOORNAM',
      quantity: 120.0,
      unit: 'Grams',
      reorderLevel: 30.0,
      lastRestocked: new Date(),
    },
    {
      medicineName: 'Thiriphala Choornam',
      formulation: 'CHOORNAM',
      quantity: 150.0,
      unit: 'Grams',
      reorderLevel: 40.0,
      lastRestocked: new Date(),
    },
    {
      medicineName: 'Nilavembu Kudineer',
      formulation: 'KUDINEER',
      quantity: 85.0,
      unit: 'Packs',
      reorderLevel: 20.0,
      lastRestocked: new Date(),
    },
    {
      medicineName: 'Nandukkal Kudineer',
      formulation: 'KUDINEER',
      quantity: 15.0, // Low stock for testing alert
      unit: 'Packs',
      reorderLevel: 25.0,
      lastRestocked: new Date(Date.now() - 30 * 24 * 3600 * 1000),
    },
    {
      medicineName: 'Vatha Kesari Thailam',
      formulation: 'THAILAM',
      quantity: 60.0,
      unit: 'Bottles (100ml)',
      reorderLevel: 15.0,
      lastRestocked: new Date(),
    },
    {
      medicineName: 'Pinda Thailam',
      formulation: 'THAILAM',
      quantity: 45.0,
      unit: 'Bottles (100ml)',
      reorderLevel: 10.0,
      lastRestocked: new Date(),
    },
    {
      medicineName: 'Aruvadai Thailam',
      formulation: 'THAILAM',
      quantity: 8.0, // Low stock
      unit: 'Bottles (100ml)',
      reorderLevel: 15.0,
      lastRestocked: new Date(Date.now() - 45 * 24 * 3600 * 1000),
    },
    {
      medicineName: 'Venpoosani Lehyam',
      formulation: 'LEHYAM',
      quantity: 90.0,
      unit: 'Jars (250g)',
      reorderLevel: 20.0,
      lastRestocked: new Date(),
    },
    {
      medicineName: 'Thethan Kottai Lehyam',
      formulation: 'LEHYAM',
      quantity: 75.0,
      unit: 'Jars (250g)',
      reorderLevel: 15.0,
      lastRestocked: new Date(),
    },
    {
      medicineName: 'Nellikai Lehyam',
      formulation: 'LEHYAM',
      quantity: 110.0,
      unit: 'Jars (250g)',
      reorderLevel: 25.0,
      lastRestocked: new Date(),
    },
  ];

  for (const item of inventoryData) {
    await prisma.inventory.create({ data: item });
  }
  console.log(`✅ Created ${inventoryData.length} inventory items across 4 formulations.`);

  // Create sample Contact Messages
  await prisma.contactMessage.createMany({
    data: [
      {
        name: 'Rajesh Kumar',
        phone: '+919876543210',
        email: 'rajesh.k@gmail.com',
        message: 'Hello Doctor, do you treat chronic joint pain with Vatha Thailam treatments?',
        isRead: false,
      },
      {
        name: 'Meenakshi Sundaram',
        phone: '+919445123456',
        email: 'meena.sundaram@gmail.com',
        message: 'I would like to inquire about Sunday clinic timings for kidney stone consultation.',
        isRead: true,
      },
    ],
  });
  console.log('✅ Created sample contact messages.');

  console.log('🎉 Seeding completed successfully!');
}

main()
  .catch((e) => {
    console.error('❌ Seeding failed:', e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
