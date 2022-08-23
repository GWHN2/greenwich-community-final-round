const adModel = require('../models/ad.model');
const { asyncWrapper } = require('../utils/');

const getAllAds = asyncWrapper(async (req, res) => {
  const ads = await adModel.find({});
  res.status(200).json({ status: 200, data: ads });
});

const createAd = asyncWrapper(async (req, res) => {
  const ad = await adModel.create(req.body);
  res.status(200).json({
    status: 200,
    data: ad,
  });
});

const getAd = asyncWrapper(async (req, res) => {
  const { id: adID } = req.params;
  const ad = await adModel.findOne({ _id: adID });
  if (!ad) {
    return res.status(404).json({
      status: 404,
      msg: 'Ad not found',
    });
  }
  res.status(200).json({
    status: 200,
    data: ad,
  });
});

const updateAd = asyncWrapper(async (req, res) => {
  const { id: adID } = req.params;
  const ad = await adModel.findOneAndUpdate({ _id: adID }, req.body, {
    new: true,
    runValidators: true,
  });
  if (!ad) {
    return res.status(404).json({
      status: 404,
      msg: 'Ad not found',
    });
  }
  res.status(200).json({
    status: 200,
    data: ad,
  });
});

const deleteAd = asyncWrapper(async (req, res) => {
  const { id: adID } = req.params;
  const ad = await adModel.findOneAndDelete({ _id: adID });
  if (!ad) {
    return res.status(404).json({
      status: 404,
      msg: 'Ad not found',
    });
  }
  res.status(200).json({
    status: 200,
    data: ad,
  });
});

module.exports = { getAllAds, createAd, getAd, updateAd, deleteAd };
