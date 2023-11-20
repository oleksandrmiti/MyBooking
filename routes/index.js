var express = require('express');
var router = express.Router();

/* GET home page. */
router.get('/', function(req, res, next) {
  res.render('index', { title: 'Express' });
});


// Show help page
router.get('/help', (req, res) => {
  res.render('help.ejs', { title: 'Speak to us' });
});

// Show about page
router.get('/about', (req, res) => {
  res.render('about.ejs', { title: 'About Us' });
});
 
module.exports = router;