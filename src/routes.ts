// To avoid Cannot redeclare block-scoped variable 'express'.ts(2451)
export {};

const express = require('express');

const routes = express.Router();

routes.get('/', (req, res) => {
    return res.json({ hELLO: "oi" })
})

routes.post('/cuties', (req, res) => {
    return res.json({ ok: true })
})

module.exports = routes;

// kG8PvidOBLGn0hFB