import React from 'react';
import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom';
import { Toaster } from 'react-hot-toast';
import { AuthProvider } from './hooks/useAuth';

// Public Pages
import Home from './pages/Home';
import About from './pages/About';
import Specialities from './pages/Specialities';
import Treatments from './pages/Treatments';
import Booking from './pages/Booking';
import Contact from './pages/Contact';
import Login from './pages/Login';

// Admin Portal
import AdminLayout from './admin/AdminLayout';
import Dashboard from './admin/Dashboard';
import Appointments from './admin/Appointments';
import Patients from './admin/Patients';
import MedicalRecords from './admin/MedicalRecords';
import Inventory from './admin/Inventory';
import Messages from './admin/Messages';

function App() {
  return (
    <AuthProvider>
      <BrowserRouter>
        <Toaster position="top-right" toastOptions={{ duration: 4000 }} />
        <Routes>
          {/* Public Website Routes */}
          <Route path="/" element={<Home />} />
          <Route path="/about" element={<About />} />
          <Route path="/specialities" element={<Specialities />} />
          <Route path="/treatments" element={<Treatments />} />
          <Route path="/book" element={<Booking />} />
          <Route path="/contact" element={<Contact />} />
          <Route path="/login" element={<Login />} />

          {/* Admin Protected Portal Routes */}
          <Route path="/admin" element={<AdminLayout />}>
            <Route index element={<Navigate to="/admin/dashboard" replace />} />
            <Route path="dashboard" element={<Dashboard />} />
            <Route path="appointments" element={<Appointments />} />
            <Route path="patients" element={<Patients />} />
            <Route path="records" element={<MedicalRecords />} />
            <Route path="inventory" element={<Inventory />} />
            <Route path="messages" element={<Messages />} />
          </Route>

          {/* Fallback */}
          <Route path="*" element={<Navigate to="/" replace />} />
        </Routes>
      </BrowserRouter>
    </AuthProvider>
  );
}

export default App;
