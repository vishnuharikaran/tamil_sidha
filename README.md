# 🌿 Tamil Siddha Clinic — Full Stack Clinic Management Platform

A production-ready, full-stack clinic management web application built for **Tamil Siddha Clinic** (Dr. Sakthi Vadivu, MD Specialist).

---

## 🏗️ Technology Stack

- **Frontend**: React.js 18 + Tailwind CSS + Vite
- **Backend**: Node.js + Express.js
- **Database & ORM**: PostgreSQL + Prisma ORM
- **Authentication**: JWT (JSON Web Tokens) + Bcrypt password hashing
- **Validation**: Zod schema validation
- **PDF Generation**: jsPDF + autoTable
- **Charts & Data Viz**: Recharts

---

## 📁 Repository Structure

```
siddha-clinic/
├── client/                  ← React + Vite + Tailwind CSS
│   ├── src/
│   │   ├── pages/           ← Home, About, Specialities, Treatments, Booking, Contact, Login
│   │   ├── components/      ← Navbar, Footer, WhatsAppButton, BookingModal
│   │   ├── admin/           ← Dashboard, Appointments, Patients, MedicalRecords, Inventory, Messages
│   │   ├── hooks/           ← useAuth.jsx
│   │   ├── utils/           ← api.js, pdfGenerator.js
│   │   ├── constants/       ← clinic.js
│   │   └── App.jsx
│   ├── index.html
│   └── package.json
├── server/                  ← Node.js + Express.js
│   ├── src/
│   │   ├── routes/          ← auth, appointments, patients, records, inventory, contact, dashboard
│   │   ├── controllers/     ← auth, appointment, patient, record, inventory, contact, stats
│   │   ├── middleware/      ← auth.js, validation.js
│   │   ├── utils/           ← response.js, slotUtils.js
│   │   ├── config/          ← clinic.js, db.js
│   │   └── index.js
│   ├── prisma/
│   │   ├── schema.prisma    ← Prisma ORM PostgreSQL schema
│   │   └── seed.js          ← Seeder script
│   └── package.json
└── .env.example
```

---

## 🚀 Quick Start Guide

### 1. Prerequisites
- Node.js (v18+)
- PostgreSQL (v13+)

### 2. Environment Setup
Copy `.env.example` to `server/.env`:
```env
DATABASE_URL="postgresql://postgres:postgres@localhost:5432/siddha_clinic?schema=public"
JWT_SECRET="tamil_siddha_clinic_jwt_secret_key_2026_super_secure"
PORT=5001
CLIENT_URL="http://localhost:5173"
NODE_ENV="development"
```

### 3. Server Installation & Database Setup
```bash
cd server
npm install

# Run Prisma migrations & Client Generation
npx prisma generate
npx prisma migrate dev --name init

# Seed Database
node prisma/seed.js

# Start Backend Server
npm start
```

### 4. Client Installation & Launch
```bash
cd client
npm install
npm run dev
```

---

## 🔑 Demo Admin Credentials

- **Email**: `admin@tamilsiddhaclinic.com`
- **Password**: `Admin@1234`

---

## 🩺 Siddha Clinical Features

1. **Clinic Constants (`CLINIC`)**:
   - Doctor: **Dr. Sakthi Vadivu**, MD (Siddha Medicine Specialist), 8+ Years Experience
   - Address: **No 74, Gangai Square Road, Thanthai Periyar Nagar, Viluppuram, Tamil Nadu 605403**
   - Hours: **Mon – Sat: 9:00 AM – 9:00 PM** | **Sun: 11:00 AM – 1:00 PM**
   - Formulations: `CHOORNAM`, `KUDINEER`, `THAILAM`, `LEHYAM`
   - Naadis: `VATHAM`, `PITHAM`, `KAPHAM`, `VATHAM_PITHAM`, `PITHAM_KAPHAM`, `VATHAM_KAPHAM`, `THINAI`

2. **Public Website**:
   - Traditional Siddha aesthetics (Deep Saffron `#C45508`, Forest Green `#2D6A4F`, Cream `#FDF6EC`).
   - Google Fonts: **Tiro Tamil** & **Lora**.
   - 3-step interactive booking form with live 30-min slot checker & Sunday operating hours indicator (11:00 AM – 1:00 PM).

3. **Doctor Admin Portal**:
   - Real-time clinical KPI stats & 7-day appointment analytics chart.
   - EHR Medical Record creator with Naadi findings, Enn Vagai parameters, and **jsPDF Prescription Export**.
   - Siddha formulation stock manager with low-stock alerts.
