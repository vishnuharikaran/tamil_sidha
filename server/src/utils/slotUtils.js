const CLINIC = require('../config/clinic');

// Helper to convert "09:30 AM" or "14:30" or "09:30" to minutes from midnight
function timeToMinutes(timeStr) {
  if (!timeStr) return -1;
  const str = timeStr.trim().toUpperCase();
  
  // Format check e.g. "09:30 AM" or "02:30 PM"
  const match12 = str.match(/^(\d{1,2}):(\d{2})\s*(AM|PM)$/);
  if (match12) {
    let hours = parseInt(match12[1], 10);
    const minutes = parseInt(match12[2], 10);
    const period = match12[3];
    if (period === 'PM' && hours < 12) hours += 12;
    if (period === 'AM' && hours === 12) hours = 0;
    return hours * 60 + minutes;
  }

  // Format check e.g. "09:30" or "14:30"
  const match24 = str.match(/^(\d{1,2}):(\d{2})$/);
  if (match24) {
    const hours = parseInt(match24[1], 10);
    const minutes = parseInt(match24[2], 10);
    return hours * 60 + minutes;
  }

  return -1;
}

// Convert minutes from midnight to "09:30 AM" string
function minutesTo12HourStr(totalMinutes) {
  let hours = Math.floor(totalMinutes / 60);
  const minutes = totalMinutes % 60;
  const period = hours >= 12 ? 'PM' : 'AM';
  if (hours > 12) hours -= 12;
  if (hours === 0) hours = 12;
  const padH = hours < 10 ? `0${hours}` : `${hours}`;
  const padM = minutes < 10 ? `0${minutes}` : `${minutes}`;
  return `${padH}:${padM} ${period}`;
}

function getClinicHoursForDate(dateObj) {
  const day = dateObj.getDay(); // 0 is Sunday, 1-6 Mon-Sat
  if (day === 0) {
    // Sunday: 11:00 AM (660 min) to 01:00 PM (780 min)
    return {
      isOpen: true,
      openMin: 11 * 60, // 660
      closeMin: 13 * 60, // 780
      label: CLINIC.hours.sunday.label,
    };
  } else {
    // Mon-Sat: 09:00 AM (540 min) to 09:00 PM (1260 min)
    return {
      isOpen: true,
      openMin: 9 * 60, // 540
      closeMin: 21 * 60, // 1260
      label: CLINIC.hours.weekdays.label,
    };
  }
}

function generate30MinSlotsForDate(dateObj) {
  const hours = getClinicHoursForDate(dateObj);
  const slots = [];
  for (let min = hours.openMin; min < hours.closeMin; min += 30) {
    slots.push(minutesTo12HourStr(min));
  }
  return slots;
}

function validateAppointmentBooking(dateStr, timeSlotStr) {
  const targetDate = new Date(dateStr);
  if (isNaN(targetDate.getTime())) {
    return { valid: false, error: 'Invalid appointment date format.' };
  }

  // Check past dates (start of today)
  const today = new Date();
  today.setHours(0, 0, 0, 0);
  const checkDate = new Date(targetDate);
  checkDate.setHours(0, 0, 0, 0);

  if (checkDate < today) {
    return { valid: false, error: 'Cannot book appointments for past dates.' };
  }

  const dayOfWeek = targetDate.getDay();
  const slotMinutes = timeToMinutes(timeSlotStr);

  if (slotMinutes === -1) {
    return { valid: false, error: 'Invalid time slot format. Example format: "09:30 AM" or "11:00 AM".' };
  }

  const hours = getClinicHoursForDate(targetDate);

  // Rejection rules
  if (dayOfWeek === 0) {
    // Sunday check
    if (slotMinutes < hours.openMin || slotMinutes >= hours.closeMin) {
      return {
        valid: false,
        error: `Sunday appointments are strictly limited to clinic operating hours: 11:00 AM – 01:00 PM. Requested slot (${timeSlotStr}) is outside operating hours.`,
      };
    }
  } else {
    // Weekday check
    if (slotMinutes < hours.openMin || slotMinutes >= hours.closeMin) {
      return {
        valid: false,
        error: `Weekday appointments are limited to clinic operating hours: 09:00 AM – 09:00 PM. Requested slot (${timeSlotStr}) is outside operating hours.`,
      };
    }
  }

  return { valid: true, targetDate, slotMinutes };
}

module.exports = {
  timeToMinutes,
  minutesTo12HourStr,
  getClinicHoursForDate,
  generate30MinSlotsForDate,
  validateAppointmentBooking,
};
