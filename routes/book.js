var express = require('express');
var router = express.Router();
const Booking = require('../model/booking.js')

// Show booking page
router.get('/create', function(req, res, next) {
  res.render('create.ejs', { title: 'Make your booking' });
});


// Create booking and show created page.
router.post('/create', function(req, res, next) {
  Booking.create(req.body)
    .then((bookingCreated) => {
      res.render('created.ejs', { title: 'Done!' });
    })
    .catch((err) => {
      console.log(err);
      next(err);
    });
});

// Show modify page
router.get('/modify', async (req, res) => {
    try {
        const bookings = await Booking.find({});
        res.render('modify.ejs', { bookings, title: 'All Bookings' });
    } catch (err) {
        console.error(err);
        res.status(500).send('An error occurred');
    }
});

// Show Delete page
router.get('/delete', async (req, res) => {
  try {
      const bookings = await Booking.find({});
      res.render('delete.ejs', { bookings, title: 'Delete Page' });
  } catch (err) {
      console.error(err);
      res.status(500).send('An error occurred');
  }
});

// Delete booking
router.post('/delete-booking', async (req, res) => {
  try {
    const bookingId = req.body.bookingId; // Find _id of booking

    // Use Mongoose to find and delete the booking by ID
    await Booking.findByIdAndDelete(bookingId);

    // Redirect back to the bookings page
    res.redirect('/booking/modify');
  } catch (err) {
    console.error(err);
    res.status(500).send('Internal Server Error');
  }
});

// Show modify form
router.get('/modify/:id', async (req, res) => {
  try {
    const bookingId = req.params.id;
    const booking = await Booking.findById(bookingId);
    res.render('modify-form.ejs', { booking, title: 'Modify Booking' });
  } catch (err) {
    console.error(err);
    res.status(500).send('An error occurred');
  }
});

// Update booking
router.post('/modify/:id', async (req, res) => {
  try {
    const bookingId = req.params.id;
    const updatedBooking = req.body; // You might want to validate and sanitize the input here

    // Use Mongoose to find and update the booking by ID
    await Booking.findByIdAndUpdate(bookingId, updatedBooking);

    // Redirect back to the bookings page or send a success message
    res.redirect('/booking/modify');
  } catch (error) {
    console.error(error);
    res.status(500).send('Internal Server Error');
  }
});

module.exports = router;