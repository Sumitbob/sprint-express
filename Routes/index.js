const express = require('express');
const user = require('./user');
const ApiAuth = require('../Middlewares/Auth/ApiAuth');
const app = express();

app.use(ApiAuth.authenticate);
app.use('/user', user);


module.exports = app;

