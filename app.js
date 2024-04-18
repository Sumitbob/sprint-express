'use strict';

const express = require('express');
const app = express();
const router = express.Router();
const morgan = require('morgan');
const bodyParser = require('body-parser');
const cors = require('cors');
const { ErrorHandler } = require('./Middlewares/Handlers');
app.use(morgan('dev'));
app.use(bodyParser.json());
app.use(cors());

const Routes = require('./routes');

router.get('/', (req, res) => {
	res.json({ success: true });
});

app.use(router);
app.use(Routes);
app.use(ErrorHandler.handle);
module.exports = app;
