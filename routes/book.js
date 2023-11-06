var express = require('express');
var router = express.Router();
const Booking = require('../model/booking.js')

// Show booking page
router.get('/create', function(req, res, next) {
  res.render('booking.ejs', { title: 'Make your booking.' });
});


// Show created page
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
// router.get('/modify', function(req,res,next){
//     res.render('modify.ejs', { title: 'Change it.' });
// });


router.get('/modify', async (req, res) => {
    try {
        const bookings = await Booking.find({}); // Correct the usage of Model.find()
        res.render('modify.ejs', { bookings, title: 'All Bookings' }); // Pass 'bookings' to the template
    } catch (err) {
        console.error(err);
        res.status(500).send('An error occurred');
    }
});


// router.get('/modify', (req, res) => {
//     Booking.find({}, (err, booking) => {
//         if (err) {
//             console.error(err);
//             res.status(500).send('An error occurred');
//         } else {
//             res.render('modify.ejs', { booking });
//         }
//     });
// });
module.exports = router;