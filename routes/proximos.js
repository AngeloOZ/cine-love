var express = require('express');
const fs = require('fs');

var router = express.Router();

/* GET users listing. */
router.get('/', function(req, res, next) {
  const peliculas = leerCartelera();
  res.render('estrenos',{title : "CineLove - Proximos Estrenos", page: 2,  data: peliculas })
});


function leerCartelera() {
  const data = fs.readFileSync('cartelera.json');
  const peliculas = JSON.parse(data);
  return peliculas;
}

module.exports = router;
