const express = require('express');
const eventRouter = express.Router();

const {
  getAllEvents,
  createEvent,
  getEvent,
  updateEvent,
  deleteEvent,
} = require('../../controllers/event.controller.js');
const verifyToken = require('../../middlewares/auth.middleware.js');

eventRouter.get('/', verifyToken, getAllEvents);
eventRouter.post('/', verifyToken, createEvent);
eventRouter.get('/:id', verifyToken, getEvent);
eventRouter.patch('/:id', verifyToken, updateEvent);
eventRouter.delete('/:id', verifyToken, deleteEvent);

module.exports = eventRouter;
