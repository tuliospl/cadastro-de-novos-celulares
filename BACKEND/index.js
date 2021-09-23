const express =  require('express');
const morgan = require('morgan');
const cors = require('cors');
const bodyParser = require('body-parser');
const routes = require('./src/config/routes');

const server = express();

server.use(morgan('dev'));
server.use(bodyParser.urlencoded({extended: false}));
server.use(express.json());
server.use(cors());
server.use(routes);

server.listen(3003, () => {
  console.log('Servidor Online')
});
