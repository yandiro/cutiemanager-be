const express = require('express');
const mongoose = require('mongoose');

mongoose.connect('mongodb+srv://devmode:kG8PvidOBLGn0hFB@cluster0.dqd70.mongodb.net/cutiemanager?retryWrites=true&w=majority',
    {
        useNewUrlParser: true,
        useUnifiedTopology: true
    });

const routes = require('./routes');

const server = express();

server.use(express.json());
server.use(routes);

const PORT = 3333;

server.listen(PORT);


