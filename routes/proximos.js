var express = require('express');
const fs = require('fs');

var router = express.Router();

/* GET users listing. */
router.get('/', function(req, res, next) {
  const peliculas = leerCartelera();
  res.render('estrenos',{title : "CineLove - Proximos Estrenos", page: 2,  data: peliculas })
});

router.get('/:id', function(req, res, next) {
  // const peliculas = leerCartelera();
  let { id } = req.params;
  const filter = leerCartelera().find(ele => ele.id == id)
  filter.trailer = filter.trailer?.slice(filter.trailer.lastIndexOf('/') + 1)

  res.render('estrenos-pelicula', { title: `${filter.titulo} - CineLove`, page: 2, pelicula: filter });
});


function leerCartelera() {
  const data = fs.readFileSync('proximos.json');
  const peliculas = JSON.parse(data);
  return peliculas;
}

module.exports = router;
