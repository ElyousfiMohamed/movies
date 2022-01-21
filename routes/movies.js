var express = require('express');
var movies = require('../movies_reduit.json');
var router = express.Router();

/* GET movies listing. */
router.get('/', function(req, res, next) {
  res.send(movies);
});

module.exports = router;
