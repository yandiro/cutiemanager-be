const express = require('express');
const routes = require('./routes');

const server = express();

server.use(routes);

const PORT = 3333;

server.listen(PORT);


