const express = require('express');
const fs = require('fs');
const emailer = require('../helpers/email');
const { base64Encode, base64Decode } = require('../helpers/generics');
const router = express.Router();

/* GET home page. */
router.get('/', function (req, res, next) {
  res.redirect('/cartelera')
});

router.get('/cartelera/', function (req, res, next) {
  const peliculas = leerCartelera();
  const state = req.flash('state')
  res.render('index', { title: 'CineLove', page: 1, data: peliculas, invitado: undefined, state });
});

router.get('/cartelera/:from', function (req, res, next) {
  let { from } = req.params;
  from = base64Decode(from);
  from = JSON.parse(from);
  req.session.correo = from.correo;
  const peliculas = leerCartelera();
  res.render('index', { title: 'CineLove', page: 1, data: peliculas, invitado: from.nombre});
});


router.get('/pelicula/:id', function (req, res, next) {
  let { id } = req.params;
  const filter = leerCartelera().find(ele => ele.id == id)
  filter.trailer = filter.trailer?.slice(filter.trailer.lastIndexOf('/') + 1)
  base64Encode
  res.render('pelicula', { title: `${filter.titulo} - CineLove`, page: 1, pelicula: filter });
});

router.post('/pelicula', function (req, res, next) {
  try {
    let data = req.body;
    const filter = leerCartelera().find(ele => ele.id == data.id)
    data.pelicula = filter;
    const inviteEmail = req.session.correo;
    const emails = [inviteEmail,'angelo-mjz7@hotmail.com'];
    emailer.sendEmailSelectMovie(emails, data)
    req.flash('state',"true");
    res.redirect('/cartelera')
    next();
  } catch (error) {
    console.error(error)
    res.send('error');
  }
});


function leerCartelera() {
  const data = fs.readFileSync('cartelera.json');
  const peliculas = JSON.parse(data);
  return peliculas;
}

module.exports = router;
