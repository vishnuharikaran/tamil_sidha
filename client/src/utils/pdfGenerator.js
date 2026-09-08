import jsPDF from 'jspdf';
import autoTable from 'jspdf-autotable';
import { CLINIC } from '../constants/clinic';

export const generatePrescriptionPDF = (record) => {
  const doc = new jsPDF();

  // Header Banner
  doc.setFillColor(27, 59, 43); // #1b3b2b dark herbal green
  doc.rect(0, 0, 210, 40, 'F');

  // Clinic Title
  doc.setTextColor(255, 255, 255);
  doc.setFont('helvetica', 'bold');
  doc.setFontSize(20);
  doc.text(CLINIC.name.toUpperCase(), 14, 18);

  doc.setFontSize(10);
  doc.setFont('helvetica', 'normal');
  doc.text(`${CLINIC.doctor} — ${CLINIC.designation}`, 14, 26);
  doc.text(`Phone: ${CLINIC.phone} | ${CLINIC.address.full}`, 14, 33);

  // Line separator
  doc.setDrawColor(212, 175, 55);
  doc.setLineWidth(1);
  doc.line(0, 40, 210, 40);

  // Patient Information Section
  doc.setTextColor(30, 41, 59);
  doc.setFontSize(12);
  doc.setFont('helvetica', 'bold');
  doc.text('PATIENT MEDICAL PRESCRIPTION', 14, 50);

  doc.setFontSize(10);
  doc.setFont('helvetica', 'normal');
  
  const patientName = record.patient?.name || 'N/A';
  const ageGender = `${record.patient?.age || 'N/A'} Yrs / ${record.patient?.gender || 'N/A'}`;
  const phone = record.patient?.phone || 'N/A';
  const visitDate = record.visitDate ? new Date(record.visitDate).toLocaleDateString() : new Date().toLocaleDateString();

  doc.text(`Patient Name: ${patientName}`, 14, 58);
  doc.text(`Age/Gender: ${ageGender}`, 14, 64);
  doc.text(`Phone: ${phone}`, 14, 70);

  doc.text(`Date of Visit: ${visitDate}`, 130, 58);
  doc.text(`Naadi Finding: ${record.naadi}`, 130, 64);
  if (record.followUpDate) {
    doc.text(`Follow-up Date: ${new Date(record.followUpDate).toLocaleDateString()}`, 130, 70);
  }

  // Diagnosis Section
  doc.setFillColor(243, 238, 227);
  doc.rect(14, 76, 182, 16, 'F');
  doc.setFont('helvetica', 'bold');
  doc.setTextColor(27, 59, 43);
  doc.text(`Diagnosis: ${record.diagnosis}`, 18, 86);

  // Prescriptions Table
  const tableRows = (record.prescriptions || []).map((p, idx) => [
    idx + 1,
    p.medicineName,
    p.formulation,
    p.dosage,
    p.duration,
    p.instructions || 'Take as directed',
  ]);

  autoTable(doc, {
    startY: 98,
    head: [['#', 'Medicine Name', 'Formulation', 'Dosage', 'Duration', 'Instructions']],
    body: tableRows,
    headStyles: {
      fillColor: [27, 59, 43],
      textColor: [255, 255, 255],
      fontStyle: 'bold',
    },
    alternateRowStyles: {
      fillColor: [251, 249, 244],
    },
    styles: {
      fontSize: 9,
      cellPadding: 4,
    },
  });

  // Footer / Doctor Signature
  const finalY = doc.lastAutoTable ? doc.lastAutoTable.finalY + 30 : 160;

  doc.setFont('helvetica', 'normal');
  doc.setFontSize(9);
  doc.setTextColor(100, 116, 139);
  doc.text('Prescribed with traditional Siddha medicinal guidance.', 14, finalY);

  doc.setFont('helvetica', 'bold');
  doc.setTextColor(27, 59, 43);
  doc.text(`${CLINIC.doctor}`, 145, finalY);
  doc.setFont('helvetica', 'normal');
  doc.setFontSize(8);
  doc.text(CLINIC.designation, 145, finalY + 5);

  doc.save(`Siddha_Prescription_${patientName.replace(/\s+/g, '_')}.pdf`);
};
