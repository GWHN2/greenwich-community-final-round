const itemModel = require('../models/item.model');
const asyncWrapper = require('../middlewares/async');

const getAllItems = asyncWrapper(async (req, res) => {
  const items = await itemModel.find({});
  res
    .status(200)
    .json({ status: 'success', data: { items, nbHits: items.length } });
});

const createItem = asyncWrapper(async (req, res) => {
  const item = await itemModel.create(req.body);
  res.status(201).json({ item });
});

const getItem = asyncWrapper(async (req, res) => {
  const { id: itemID } = req.params;
  const item = await itemModel.findOne({ _id: itemID });
  if (!item) {
    return next(createCustomError('Item not found', 404));
  }
  res.status(200).json({ item });
});

const updateItem = asyncWrapper(async (req, res) => {
  const { id: itemID } = req.params;
  const item = await itemModel.findOneAndUpdate({ _id: itemID }, req.body, {
    new: true,
    runValidators: true,
  });
  if (!item) {
    return next(createCustomError('Item not found', 404));
  }
  res.status(200).json({ item });
});

const deleteItem = asyncWrapper(async (req, res) => {
  const { id: itemID } = req.params;
  const item = await itemModel.findOneAndDelete({ _id: itemID });
  if (!item) {
    return next(createCustomError('Item not found', 404));
  }
  res.status(200).json({ item });
});

module.exports = { getAllItems, createItem, getItem, updateItem, deleteItem };
