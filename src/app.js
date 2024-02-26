const express = require('express');
const bodyParser = require('body-parser');

const indexRouter = require('./routes/index.route');

const app = express();

app.use(express.json());
app.use(express.urlencoded({
  extended: false
}));

app.use(bodyParser.json());

app.use('/', indexRouter);

module.exports = app;