const express = require('express');
const eventRouter = express.Router();

const {
  getAllEvents,
  createEvent,
  getEvent,
  updateEvent,
  deleteEvent,
} = require('../../controllers/event.controller');
const {
  verifyToken,
  verifyAdmin,
} = require('../../middlewares/auth.middleware');

eventRouter.get('/', verifyToken, getAllEvents);
eventRouter.post('/', verifyToken, verifyAdmin, createEvent);
eventRouter.get('/:id', verifyToken, getEvent);
eventRouter.patch('/:id', verifyToken, verifyAdmin, updateEvent);
eventRouter.delete('/:id', verifyToken, verifyAdmin, deleteEvent);

module.exports = eventRouter;
