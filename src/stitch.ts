const express = require('express');
const routes = require('./routes');

const server = express();

server.use(express.json());

server.use(routes);

const PORT = 3333;

server.listen(PORT);


