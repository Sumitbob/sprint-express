'use strict';

const express = require('express');
const app = express();
const router = express.Router();
const morgan = require('morgan');
const bodyParser = require('body-parser');
const {ErrorHandler} = require('./Middlewares/Handlers');

app.use(morgan('dev'));
app.use(bodyParser.json());

const Routes = require('./Routes');

router.get('/', (req, res) => {
	res.json({success: true});
});


app.use(router);
app.use(Routes);
app.use(ErrorHandler.handle);
module.exports = app;
