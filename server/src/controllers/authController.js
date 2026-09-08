const prisma = require('../config/db');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const { sendSuccess, sendError } = require('../utils/response');

const login = async (req, res) => {
  try {
    const { email, password } = req.body;

    const admin = await prisma.admin.findUnique({ where: { email } });
    if (!admin) {
      return sendError(res, 'Invalid credentials', 401);
    }

    const isMatch = await bcrypt.compare(password, admin.passwordHash);
    if (!isMatch) {
      return sendError(res, 'Invalid credentials', 401);
    }

    const token = jwt.sign(
      { id: admin.id, email: admin.email },
      process.env.JWT_SECRET || 'secret',
      { expiresIn: '1d' }
    );

    return sendSuccess(
      res,
      { token, admin: { id: admin.id, email: admin.email } },
      'Login successful'
    );
  } catch (err) {
    console.error('Login error:', err);
    return sendError(res, 'Server error during login', 500);
  }
};

const logout = async (req, res) => {
  return sendSuccess(res, null, 'Logged out successfully');
};

const getMe = async (req, res) => {
  try {
    const admin = await prisma.admin.findUnique({
      where: { id: req.admin.id },
      select: { id: true, email: true, createdAt: true },
    });
    if (!admin) {
      return sendError(res, 'Admin not found', 404);
    }
    return sendSuccess(res, { admin }, 'Admin profile retrieved');
  } catch (err) {
    return sendError(res, 'Server error fetching admin profile', 500);
  }
};

module.exports = { login, logout, getMe };
