const express = require('express');
const Auth = require('./Auth');
const app = express();

app.use('/auth', Auth);


module.exports = app;

