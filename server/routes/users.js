const express = require('express');
const router  = express.Router();
const controller = require('../controllers/users');

router.get('/', controller.getAllUser);

module.exports = router;
