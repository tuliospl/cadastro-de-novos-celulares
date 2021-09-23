const express = require('express');
const routes = express.Router()

let celulares = require('../data/celulares');


// Busca todos os Celulares
routes.get('/phone', (req, res) => {
  // console.log(celulares)
  return res.json(celulares)
});


// Busca o Celular pelo Codigo
routes.get('/phone/:id', (req, res) => {
  const Code = req.params.id;
  const smartphoneIndex = celulares.find((c) => c.Code === Code);
  // console.log(smartphoneIndex);
  return res.status(200).json(smartphoneIndex);
});


// Insere um novo Celular
routes.post('/phone', (req, res) => {
  // console.log(req.body)
  const { Code, Model, Price, Brand, Color, StartDate, EndDate } = req.body

  if(!req.body)
    return res.status(400).end()

  celulares.push({ Code, Model, Price, Brand, Color, StartDate, EndDate })
  return res.json(celulares)
});


// Deleta Celular
routes.delete('/phone/:id', (req, res) => {
  const id = req.params.id
  const newCelulares = celulares.splice(id, 1);
  return newCelulares
});


// Edita o Celular
routes.patch('/phone/:id', (req, res) => {
  const Code = req.params.id;
  // console.log(Code);
  // console.log(req.body);
  const { Model, Price, Brand, Color, StartDate, EndDate  } = req.body
  
  celulares.filter((c) => { if(c.Code === Code) {
    c.Brand = Brand, c.Color = Color, c.StartDate = StartDate, c.EndDate = EndDate, c.Model = Model, c.Price = Price;
  } })

  return res.json(celulares);
});

module.exports = routes
