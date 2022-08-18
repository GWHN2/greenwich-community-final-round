const Event = require('../models/Event');
const asyncWrapper = require('../middleware/async');
const { createCustomError } = require('../errors/custom-error');

const getAllEvents = asyncWrapper(async (req, res) => {
  const events = await Event.find({});
  res
    .status(200)
    .json({ status: 'success', data: { events, nbHits: events.length } });
});

const createEvent = asyncWrapper(async (req, res) => {
  const event = await Event.create(req.body);
  res.status(201).json({ event });
});

const getEvent = asyncWrapper(async (req, res) => {
  const { id: eventID } = req.params;
  const event = await Event.findOne({ _id: eventID });
  if (!event) {
    return next(createCustomError('Course not found', 404));
  }
  res.status(200).json({ event });
});

const updateEvent = asyncWrapper(async (req, res) => {
  const { id: eventID } = req.params;
  const event = await Event.findOneAndUpdate({ _id: eventID }, req.body, {
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
  const event = await Event.findOneAndDelete({ _id: eventID });
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
