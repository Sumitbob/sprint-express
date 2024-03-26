'use strict';

const app = require('../app.js');
const Server = require('./Server.js');

const server = new Server(app);
const httpServer = server.start(process.env.PORT || '3000');

module.exports = httpServer;
