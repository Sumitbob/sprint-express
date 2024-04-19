'use strict';

const express = require('express');
const app = express();
const router = express.Router();
const morgan = require('morgan');
const bodyParser = require('body-parser');
const cors = require('cors');
const path = require('path');
const { ErrorHandler } = require('./Middlewares/Handlers');
app.use(morgan('dev'));

app.use(bodyParser.json({ limit: '10mb',
	verify: (req, res, buf) => {
		req.rawBody = buf.toString();
	} }));


app.use(bodyParser.urlencoded({ extended: true, limit: '10mb', }));
app.use(express.static(path.join(__dirname, 'public')));

app.use(cors());

router.get('/', (req, res) => {
	res.sendFile('cashfree.html', { root: path.join(__dirname, 'public') });
	// res.json({ success: true });
});

const Routes = require('./routes');

app.use(router);
app.use(Routes);
app.use(ErrorHandler.handle);
module.exports = app;
