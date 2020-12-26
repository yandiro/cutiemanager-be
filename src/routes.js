const express = require('express');

const routes = express.Router();

const CutieController = require('./controllers/CutieController')
const UserController = require('./controllers/UserController')

routes.get('/', (req, res) => {
    return res.json({ hELLO: "oi" })
})

routes.post('/cuties', CutieController.store);
routes.post('/users', UserController.store);

module.exports = routes;

// kG8PvidOBLGn0hFB