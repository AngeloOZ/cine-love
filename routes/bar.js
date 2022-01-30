var express = require('express');
var router = express.Router();

/* GET users listing. */
router.get('/', function (req, res, next) {
  res.render('bar', { title: "CineLove - Bar", page: 3 })
});

module.exports = router;
