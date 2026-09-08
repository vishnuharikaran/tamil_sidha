const express = require('express');
const {
  getInventory,
  getLowStockInventory,
  createInventoryItem,
  updateInventoryItem,
  deleteInventoryItem,
} = require('../controllers/inventoryController');
const { authenticateAdmin } = require('../middleware/auth');
const { validateBody, inventorySchema } = require('../middleware/validation');

const router = express.Router();

router.use(authenticateAdmin);

router.get('/', getInventory);
router.get('/low-stock', getLowStockInventory);
router.post('/', validateBody(inventorySchema), createInventoryItem);
router.put('/:id', validateBody(inventorySchema), updateInventoryItem);
router.delete('/:id', deleteInventoryItem);

module.exports = router;
