const eventModel = require('../models/event.model');
const { asyncWrapper } = require('../utils');
const { createCustomError } = require('../utils/custom-error');

const getAllEvents = asyncWrapper(async (req, res) => {
  const events = await eventModel.find({});
  res
    .status(200)
    .json({ status: 'success', data: { events, nbHits: events.length } });
});

const createEvent = asyncWrapper(async (req, res) => {
  const event = await eventModel.create(req.body);
  res.status(201).json({ event });
});

const getEvent = asyncWrapper(async (req, res) => {
  const { id: eventID } = req.params;
  const event = await eventModel.findOne({ _id: eventID });
  if (!event) {
    return next(createCustomError('Course not found', 404));
  }
  res.status(200).json({ event });
});

const updateEvent = asyncWrapper(async (req, res) => {
  const { id: eventID } = req.params;
  const event = await eventModel.findOneAndUpdate({ _id: eventID }, req.body, {
    new: true,
    runValidators: true,
  });
  if (!event) {
    return next(createCustomError('Course not found', 404));
  }
  res.status(200).json({ event });
});

const deleteEvent = asyncWrapper(async (req, res) => {
  const { id: eventID } = req.params;
  const event = await eventModel.findOneAndDelete({ _id: eventID });
  if (!event) {
    return next(createCustomError('Course not found', 404));
  }
  res.status(200).json({ event });
});

module.exports = {
  getAllEvents,
  createEvent,
  getEvent,
  updateEvent,
  deleteEvent,
};
