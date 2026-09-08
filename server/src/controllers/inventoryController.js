const prisma = require('../config/db');
const { sendSuccess, sendError } = require('../utils/response');

const getInventory = async (req, res) => {
  try {
    const { formulation, search } = req.query;
    const where = {};
    if (formulation) where.formulation = formulation;
    if (search) {
      where.medicineName = { contains: search, mode: 'insensitive' };
    }

    const items = await prisma.inventory.findMany({
      where,
      orderBy: { medicineName: 'asc' },
    });

    return sendSuccess(res, items, 'Inventory items retrieved');
  } catch (err) {
    return sendError(res, 'Failed to fetch inventory items', 500);
  }
};

const getLowStockInventory = async (req, res) => {
  try {
    const allItems = await prisma.inventory.findMany({
      orderBy: { medicineName: 'asc' },
    });

    const lowStockItems = allItems.filter(item => item.quantity <= item.reorderLevel);

    return sendSuccess(res, lowStockItems, 'Low stock items retrieved');
  } catch (err) {
    return sendError(res, 'Failed to fetch low stock inventory items', 500);
  }
};

const createInventoryItem = async (req, res) => {
  try {
    const { medicineName, formulation, quantity, unit, reorderLevel } = req.body;

    const item = await prisma.inventory.create({
      data: {
        medicineName,
        formulation,
        quantity,
        unit,
        reorderLevel: reorderLevel !== undefined ? reorderLevel : 10,
        lastRestocked: new Date(),
      },
    });

    return sendSuccess(res, item, 'Inventory item added successfully', 201);
  } catch (err) {
    return sendError(res, 'Failed to create inventory item', 500);
  }
};

const updateInventoryItem = async (req, res) => {
  try {
    const { id } = req.params;
    const { medicineName, formulation, quantity, unit, reorderLevel } = req.body;

    const item = await prisma.inventory.update({
      where: { id },
      data: {
        medicineName,
        formulation,
        quantity,
        unit,
        reorderLevel,
        lastRestocked: new Date(),
      },
    });

    return sendSuccess(res, item, 'Inventory stock updated successfully');
  } catch (err) {
    return sendError(res, 'Failed to update inventory item', 500);
  }
};

const deleteInventoryItem = async (req, res) => {
  try {
    const { id } = req.params;
    await prisma.inventory.delete({ where: { id } });
    return sendSuccess(res, null, 'Inventory item deleted');
  } catch (err) {
    return sendError(res, 'Failed to delete inventory item', 500);
  }
};

module.exports = {
  getInventory,
  getLowStockInventory,
  createInventoryItem,
  updateInventoryItem,
  deleteInventoryItem,
};
