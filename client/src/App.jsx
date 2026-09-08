import React, { Suspense, lazy } from 'react';
import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom';
import { Toaster } from 'react-hot-toast';
import { AuthProvider } from './hooks/useAuth';
import LoadingSkeleton from './components/LoadingSkeleton';

// Public Pages (Lazy Loaded)
const Home = lazy(() => import('./pages/Home'));
const About = lazy(() => import('./pages/About'));
const Specialities = lazy(() => import('./pages/Specialities'));
const Treatments = lazy(() => import('./pages/Treatments'));
const Booking = lazy(() => import('./pages/Booking'));
const Contact = lazy(() => import('./pages/Contact'));
const Login = lazy(() => import('./pages/Login'));
const NotFound = lazy(() => import('./pages/NotFound'));

// Admin Portal Pages (Lazy Loaded)
const AdminLayout = lazy(() => import('./admin/AdminLayout'));
const Dashboard = lazy(() => import('./admin/Dashboard'));
const Appointments = lazy(() => import('./admin/Appointments'));
const Patients = lazy(() => import('./admin/Patients'));
const PatientProfile = lazy(() => import('./admin/PatientProfile'));
const MedicalRecords = lazy(() => import('./admin/MedicalRecords'));
const CreateRecord = lazy(() => import('./admin/CreateRecord'));
const Inventory = lazy(() => import('./admin/Inventory'));
const Messages = lazy(() => import('./admin/Messages'));

function App() {
  return (
    <AuthProvider>
      <BrowserRouter>
        <Toaster position="top-right" toastOptions={{ duration: 4000 }} />
        <Suspense fallback={<LoadingSkeleton />}>
          <Routes>
            {/* Public Website Routes */}
            <Route path="/" element={<Home />} />
            <Route path="/about" element={<About />} />
            <Route path="/specialities" element={<Specialities />} />
            <Route path="/treatments" element={<Treatments />} />
            <Route path="/book" element={<Booking />} />
            <Route path="/contact" element={<Contact />} />
            <Route path="/login" element={<Login />} />
            <Route path="/admin/login" element={<Login />} />

            {/* Admin Protected Portal Routes */}
            <Route path="/admin" element={<AdminLayout />}>
              <Route index element={<Navigate to="/admin/dashboard" replace />} />
              <Route path="dashboard" element={<Dashboard />} />
              <Route path="appointments" element={<Appointments />} />
              <Route path="patients" element={<Patients />} />
              <Route path="patients/:id" element={<PatientProfile />} />
              <Route path="records" element={<MedicalRecords />} />
              <Route path="records/new" element={<CreateRecord />} />
              <Route path="inventory" element={<Inventory />} />
              <Route path="messages" element={<Messages />} />
            </Route>

            {/* Fallback 404 Route */}
            <Route path="*" element={<NotFound />} />
          </Routes>
        </Suspense>
      </BrowserRouter>
    </AuthProvider>
  );
}

export default App;
