const express = require('express');
const router = express.Router();
const fs = require('fs');
const uuidv4 = require('uuid/v4');

const json_ropas = fs.readFileSync('src/public/baseDatosRopa.json', 'utf-8');
let ropas = JSON.parse(json_ropas);

router.get('/', (req, res) => {
  res.render('index', { ropas });
});

router.get('/new-entry', (req, res) => {
  res.render('new-entry');
});

router.post('/new-entry', (req, res) => {

  const { titulo, imagen, precio, talla, stock, des } = req.body;

  if (!titulo || !imagen || !precio || !talla || !stock || !des) {
    res.status(400).send("Entries must have a titulo and body");
    return;
  }

  var newRopa = {
    id: uuidv4(),
    titulo,
    imagen,
    precio,
    talla,
    stock,
    des
  };

  // add a new book to the array
  ropas.push(newRopa);

  // saving the array in a file
  const json_ropas = JSON.stringify(ropas);
  fs.writeFileSync('src/public/baseDatosRopa.json', json_ropas, 'utf-8');

  res.redirect('/');
});

router.get('/delete/:id', (req, res) => {
  ropas = ropas.filter(book => book.id != req.params.id);

  // saving data
  const json_ropas = JSON.stringify(ropas);
  fs.writeFileSync('src/public/baseDatosRopa.json', json_ropas, 'utf-8');

  res.redirect('/')
});

module.exports = router;