const express = require('express');
const {
  verifyToken,
  verifyAdmin,
} = require('../../middlewares/auth.middleware');
const marketplaceRouter = express.Router();
const {
  getAllItems,
  createItem,
  getItem,
  updateItem,
  deleteItem,
} = require('../../controllers/marketplace.controller');

marketplaceRouter.get('/', verifyToken, getAllItems);
marketplaceRouter.post('/', verifyToken, verifyAdmin, createItem);
marketplaceRouter.get('/:id', verifyToken, getItem);
marketplaceRouter.patch('/:id', verifyToken, verifyAdmin, updateItem);
marketplaceRouter.delete('/:id', verifyToken, verifyAdmin, deleteItem);

module.exports = marketplaceRouter;
