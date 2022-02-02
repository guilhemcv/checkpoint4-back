const vinRouter = require('express').Router();
const wine = require('../models/vin');

vinRouter.get('/', (req, res) => {
  wine
    .getWine()
    .then((results) => res.status(200).send(results[0]))
    .catch((err) => res.status(500).send(err));
});

module.exports = vinRouter;
