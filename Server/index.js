'use strict';

const DatabaseManager = require('./DatabaseManager.js');
const ShutdownHandler = require('./ShutdownHandler.js');

(async () => {
	try {
		await new DatabaseManager('development').initializeSQL();
		
		const httpServer = require('./main.js');

		const shutdownHandler = new ShutdownHandler(httpServer);
		process.on('SIGINT', () => shutdownHandler.gracefulShutdown('SIGINT'));
		process.on('SIGTERM', () => shutdownHandler.gracefulShutdown('SIGTERM'));
		process.on('uncaughtException', (err, origin) =>
			shutdownHandler.handleUncaughtException(err, origin)
		);
		process.on('unhandledRejection', (reason, promise) =>
			shutdownHandler.handleUnhandledRejection(reason, promise)
		);
	} catch (error) {
		// eslint-disable-next-line no-console
		console.error('Error initializing application:', error);
		process.exit(1);
	}
})();
