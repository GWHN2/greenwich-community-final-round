const eventModel = require('../models/event.model');
const { asyncWrapper } = require('../utils');
const { createCustomError } = require('../utils/custom-error');

const getAllEvents = asyncWrapper(async (req, res) => {
  const events = await eventModel.find({});
  res.status(200).json({ status: 200, data: events });
});

const createEvent = asyncWrapper(async (req, res) => {
  const event = await eventModel.create(req.body);
  res.status(200).json({
    status: 200,
    data: event,
  });
});

const getEvent = asyncWrapper(async (req, res) => {
  const { id: eventID } = req.params;
  const event = await eventModel.findOne({ _id: eventID });
  if (!event) {
    return res.status(404).json({
      status: 404,
      msg: 'Course not found',
    });
  }
  res.status(200).json({
    status: 200,
    data: event,
  });
});

const updateEvent = asyncWrapper(async (req, res) => {
  const { id: eventID } = req.params;
  const event = await eventModel.findOneAndUpdate({ _id: eventID }, req.body, {
    new: true,
    runValidators: true,
  });
  if (!event) {
    return res.status(404).json({
      status: 404,
      msg: 'Course not found',
    });
  }
  res.status(200).json({
    status: 200,
    data: event,
  });
});

const deleteEvent = asyncWrapper(async (req, res) => {
  const { id: eventID } = req.params;
  const event = await eventModel.findOneAndDelete({ _id: eventID });
  if (!event) {
    return res.status(404).json({
      status: 404,
      msg: 'Course not found',
    });
  }
  res.status(200).json({
    status: 200,
    data: event,
  });
});

module.exports = {
  getAllEvents,
  createEvent,
  getEvent,
  updateEvent,
  deleteEvent,
};
