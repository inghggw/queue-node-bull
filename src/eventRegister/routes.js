const express = require('express');
const router = express.Router();
const { register } = require('./controller');

router.post('/register', register);

module.exports = (app) => {
  app.use('/event', router);
};
