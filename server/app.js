const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors');
const routes = require('./routes');

const app = express();
app.use(bodyParser.json());
// Automatically allow cross-origin requests
app.use(cors());

routes(app);

app.use((req, res, next) => {
  res.header("Access-Control-Allow-Origin", "*");
  res.header('Access-Control-Allow-Methods', 'GET,PUT,POST,DELETE,PATCH,OPTIONS');
  res.header('Access-Control-Allow-Headers', 'Origin, Content-Type, X-Auth-Token, X-Requested-With, X-HTTP-Method-Override, Content-Type, Accept');
  next();
});
app.use(express.urlencoded({ extended: false }));

module.exports = app;