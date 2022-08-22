const express = require('express');
const {
  verifyToken,
  verifyEmployer,
} = require('../../middlewares/auth.middleware');
const adRoute = express.Router();
const {
  getAllAds,
  createAd,
  getAd,
  updateAd,
  deleteAd,
} = require('../../controllers/ad.controller');

adRoute.get('/', verifyToken, getAllAds);
adRoute.post('/', verifyToken, verifyEmployer, createAd);
adRoute.get('/:id', verifyToken, getAd);
adRoute.put('/:id', verifyToken, verifyEmployer, updateAd);
adRoute.delete('/:id', verifyToken, verifyEmployer, deleteAd);

module.exports = adRoute;
