const prisma = require('../config/db');
const { sendSuccess, sendError } = require('../utils/response');

const submitContactMessage = async (req, res) => {
  try {
    const { name, phone, email, message } = req.body;

    const contactMsg = await prisma.contactMessage.create({
      data: {
        name,
        phone,
        email: email || null,
        message,
      },
    });

    return sendSuccess(res, contactMsg, 'Thank you for reaching out! We will contact you soon.', 201);
  } catch (err) {
    return sendError(res, 'Failed to submit contact message', 500);
  }
};

const getContactMessages = async (req, res) => {
  try {
    const messages = await prisma.contactMessage.findMany({
      orderBy: { createdAt: 'desc' },
    });
    return sendSuccess(res, messages, 'Contact messages retrieved');
  } catch (err) {
    return sendError(res, 'Failed to fetch contact messages', 500);
  }
};

const markMessageRead = async (req, res) => {
  try {
    const { id } = req.params;
    const msg = await prisma.contactMessage.update({
      where: { id },
      data: { isRead: true },
    });
    return sendSuccess(res, msg, 'Message marked as read');
  } catch (err) {
    return sendError(res, 'Failed to update message status', 500);
  }
};

module.exports = {
  submitContactMessage,
  getContactMessages,
  markMessageRead,
};
