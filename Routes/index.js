const express = require('express');
const user = require('./user');
const casfree = require('./cashfree');
const ApiAuth = require('../Middlewares/auth/ApiAuth');
const app = express();


app.use('/cashfree', casfree);
app.use(ApiAuth.authenticate);
app.use('/user', user);


module.exports = app;

