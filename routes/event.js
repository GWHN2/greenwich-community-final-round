const express = require('express');
const router = express.Router();

const {
  getAllEvents,
  createEvent,
  getEvent,
  updateEvent,
  deleteEvent,
} = require('../controllers/event');

router.route('/').get(getAllEvents).post(createEvent);
router.route('/:id').get(getEvent).patch(updateEvent).delete(deleteEvent);

module.exports = router;
