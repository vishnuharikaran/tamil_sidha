const prisma = require('../config/db');
const { sendSuccess, sendError } = require('../utils/response');

const getDashboardStats = async (req, res) => {
  try {
    const todayStart = new Date();
    todayStart.setHours(0, 0, 0, 0);
    const todayEnd = new Date();
    todayEnd.setHours(23, 59, 59, 999);

    // 1. Today Appointments Count
    const todayAppointments = await prisma.appointment.count({
      where: {
        date: { gte: todayStart, lte: todayEnd },
      },
    });

    // 2. Pending Appointments Count
    const pendingCount = await prisma.appointment.count({
      where: { status: 'PENDING' },
    });

    // 3. Total Patients Count
    const totalPatients = await prisma.patient.count();

    // 4. Low Stock Items Count
    const inventoryItems = await prisma.inventory.findMany();
    const lowStockCount = inventoryItems.filter(item => item.quantity <= item.reorderLevel).length;

    // 5. Unread Messages Count
    const unreadMessages = await prisma.contactMessage.count({
      where: { isRead: false },
    });

    // 6. Weekly Appointments Array for Chart (last 7 days)
    const weeklyAppointments = [];
    for (let i = 6; i >= 0; i--) {
      const d = new Date();
      d.setDate(d.getDate() - i);
      const dayStart = new Date(d);
      dayStart.setHours(0, 0, 0, 0);
      const dayEnd = new Date(d);
      dayEnd.setHours(23, 59, 59, 999);

      const count = await prisma.appointment.count({
        where: {
          date: { gte: dayStart, lte: dayEnd },
        },
      });

      const dateStr = d.toISOString().split('T')[0];
      const dayName = d.toLocaleDateString('en-US', { weekday: 'short' });

      weeklyAppointments.push({
        date: dateStr,
        day: dayName,
        count,
      });
    }

    return sendSuccess(
      res,
      {
        todayAppointments,
        pendingCount,
        totalPatients,
        lowStockCount,
        unreadMessages,
        weeklyAppointments,
      },
      'Dashboard statistics retrieved'
    );
  } catch (err) {
    console.error('getDashboardStats error:', err);
    return sendError(res, 'Failed to fetch dashboard statistics', 500);
  }
};

module.exports = { getDashboardStats };
