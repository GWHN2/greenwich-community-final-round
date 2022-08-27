const express = require('express');
const {
  verifyToken,
  verifyEmployer,
} = require('../../middlewares/auth.middleware');
const adRouter = express.Router();
const {
  getAllAds,
  createAd,
  getAd,
  updateAd,
  deleteAd,
} = require('../../controllers/ad.controller');

adRouter.get('/', verifyToken, getAllAds);
adRouter.post('/', verifyToken, verifyEmployer, createAd);
adRouter.get('/:id', verifyToken, getAd);
adRouter.patch('/:id', verifyToken, verifyEmployer, updateAd);
adRouter.delete('/:id', verifyToken, verifyEmployer, deleteAd);

module.exports = adRouter;
