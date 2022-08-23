const itemModel = require('../models/item.model');
const { asyncWrapper } = require('../utils');

const getAllItems = asyncWrapper(async (req, res) => {
  const items = await itemModel.find({});
  res.status(200).json({ status: 200, data: items });
});

const createItem = asyncWrapper(async (req, res) => {
  const item = await itemModel.create(req.body);
  res.status(200).json({
    status: 200,
    data: item,
  });
});

const getItem = asyncWrapper(async (req, res) => {
  const { id: itemID } = req.params;
  const item = await itemModel.findOne({ _id: itemID });
  if (!item) {
    return res.status(404).json({
      status: 404,
      msg: 'Item not found',
    });
  }
  res.status(200).json({
    status: 200,
    data: item,
  });
});

const updateItem = asyncWrapper(async (req, res) => {
  const { id: itemID } = req.params;
  const item = await itemModel.findOneAndUpdate({ _id: itemID }, req.body, {
    new: true,
    runValidators: true,
  });
  if (!item) {
    return res.status(404).json({
      status: 404,
      msg: 'Item not found',
    });
  }
  res.status(200).json({
    status: 200,
    data: item,
  });
});

const deleteItem = asyncWrapper(async (req, res) => {
  const { id: itemID } = req.params;
  const item = await itemModel.findOneAndDelete({ _id: itemID });
  if (!item) {
    return res.status(404).json({
      status: 404,
      msg: 'Item not found',
    });
  }
  res.status(200).json({
    status: 200,
    data: item,
  });
});

module.exports = { getAllItems, createItem, getItem, updateItem, deleteItem };
