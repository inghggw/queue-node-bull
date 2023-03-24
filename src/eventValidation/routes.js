const express = require('express');
const router = express.Router();
const { getAll } = require('./controller');

router.get('/validated', getAll);

module.exports = (app) => {
  app.use('/event', router);
};
