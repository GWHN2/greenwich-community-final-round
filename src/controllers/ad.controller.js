const adModel = require('../models/ad.model');
const { asyncWrapper } = require('../utils/');

const getAllAds = asyncWrapper(async (req, res) => {
  const ads = await adModel.find({});
  res
    .status(200)
    .json({ status: 'success', data: { ads, nbHits: ads.length } });
});

const createAd = asyncWrapper(async (req, res) => {
  const ad = await adModel.create(req.body);
  res.status(201).json({ ad });
});

const getAd = asyncWrapper(async (req, res) => {
  const { id: adID } = req.params;
  const ad = await adModel.findOne({ _id: adID });
  if (!ad) {
    return next(createCustomError('Ad not found', 404));
  }
  res.status(200).json({ ad });
});

const updateAd = asyncWrapper(async (req, res) => {
  const { id: adID } = req.params;
  const ad = await adModel.findOneAndUpdate({ _id: adID }, req.body, {
    new: true,
    runValidators: true,
  });
  if (!ad) {
    return next(createCustomError('Ad not found', 404));
  }
  res.status(200).json({ ad });
});

const deleteAd = asyncWrapper(async (req, res) => {
  const { id: adID } = req.params;
  const ad = await adModel.findOneAndDelete({ _id: adID });
  if (!ad) {
    return next(createCustomError('Ad not found', 404));
  }
  res.status(200).json({ ad });
});

module.exports = { getAllAds, createAd, getAd, updateAd, deleteAd };
