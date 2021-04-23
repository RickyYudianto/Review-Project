const router = require('express').Router();
const users  = require('../routes/users');


router.get('/', (req, res) => {
  res.status(200).json({ message : 'Welcome to the API'});
});

router.get('*', (req, res) => {
  res.json({err: 'not found'})
});

module.exports = (app) => {
  app.use('/users', users);
  app.use('/', router);
};