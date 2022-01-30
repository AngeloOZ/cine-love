const express = require('express');
const fs = require('fs');
const { base64Encode, base64Decode } = require('../helpers/generics');
const emailer = require('../helpers/email');
const router = express.Router();

router.get('/', function (req, res, next) {
    const estado = req.flash('confirmacion');
    res.render('config',{state:estado});
});
router.post('/invitar', async function (req, res, next) {
    try {
        const urlBase = 'https://cine-love.herokuapp.com/cartelera';
        // const urlBase = 'http://localhost:3000/cartelera';
        const user = req.body;
        const urlB64 = base64Encode(JSON.stringify(user));
        user.url = `${urlBase}/${urlB64}`;
        emailer.sendEmail(user);
        req.flash('confirmacion','ok');
        res.redirect('/config');
    } catch (error) {
        console.error(error)
        res.send('error');
    }
});

module.exports = router;
  