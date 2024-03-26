/* eslint-disable no-console, no-fallthrough */
'use strict';

const http = require('http');

class Server {
	constructor(app) {
		this.app = app;
	}

	start(port) {
		const server = http.createServer(this.app);
		server.listen(port);
		server.on('error', (error) => this.onError(error, port));
		server.on('listening', () => this.onListening(server));
		return server;
	}

	onError(error, port) {
		if (error.syscall !== 'listen') {
			throw error;
		}

		const bind = typeof port === 'string' ? 'Pipe ' + port : 'Port ' + port;

		switch (error.code) {
		case 'EACCES':
			console.error(bind + ' requires elevated privileges');
			process.exit(1);
		case 'EADDRINUSE':
			console.error(bind + ' is already in use');
			process.exit(1);
		default:
			throw error;
		}
	}

	onListening(server) {
		const addr = server.address();
		const bind =
			typeof addr === 'string' ? 'pipe ' + addr : 'port ' + addr.port;
		console.log('Listening on ' + bind);
	}
}

module.exports = Server;
