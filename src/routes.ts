export {};

const express = require('express');

const routes = express.Router();

routes.get('/', (req, res) => {
    return res.send('{hELLO: oi}')
})

module.exports = routes;