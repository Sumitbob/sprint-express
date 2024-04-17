const express = require('express');
const app = express();
const user = require('./user');
const ApiAuth = require('../Middlewares/Auth/ApiAuth');
const seller = require('./seller');

app.use('/user', user);
app.use('/seller', seller);
app.use(ApiAuth.authenticate);


module.exports = app;

