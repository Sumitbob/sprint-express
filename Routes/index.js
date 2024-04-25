const express = require('express');
const app = express();
const user = require('./user');
const seller = require('./seller');
const kyc = require('./kyc');

const casfree = require('./cashfree');
const ApiAuth = require('../Middlewares/auth/ApiAuth');


app.use('/cashfree', casfree);
// app.use(ApiAuth.authenticate);
app.use('/user', user);
app.use('/seller', seller);
app.use('/kyc', kyc);


module.exports = app;

