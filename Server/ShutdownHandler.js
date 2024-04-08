/* eslint-disable no-console */

class ShutdownHandler {
	constructor (httpServer) {
		this.httpServer = httpServer;
		this.readDb = readDb;
		this.writeDb = writeDb;
		this.gracefulShutDownCalled = false;
		this.uncaughtExceptionAttempts = 0;
	}

	async gracefulShutdown (signal = null) {
		this.gracefulShutDownCalled = true;
		if (signal !== null) console.log(`Received ${signal}`);
		console.log('Gracefully shutting down');
		try {
			await this.onServerClosed();
			this.httpServer.close();
			console.log('HTTP server closed');
		} catch (err) {
			console.error(`Error in closing httpServer ${err}`);
			await this.retryOnServerClosed();
		}
	}

	async handleUncaughtException (err, origin) {
		console.error(`Uncaught exception ${err}\nException origin ${origin}`);
		try {
			if (this.gracefulShutDownCalled) {
				await this.onServerClosed(err, origin);
			} else if (this.uncaughtExceptionAttempts < 3) {
				console.log('Attempting to handle uncaught exception again...');
				this.uncaughtExceptionAttempts++;
				await this.handleUncaughtException(err, origin);
			} else {
				await this.gracefulShutdown();
			}
		} catch (err) {
			console.log('Error in gracefulShutdown', err);
			console.log('Executing onServerClosed');
			await this.onServerClosed(err, origin);
		}
	}
	

	async handleUnhandledRejection (reason, promise) {
		console.error(`Unhandled rejection at ${promise}\nReason ${reason}`);
		try {
			this.gracefulShutDownCalled
				? await this.onServerClosed()
				: await this.gracefulShutdown();
		} catch (err) {
			console.log('Error in gracefulShutdown', err);
			console.log('Executing onServerClosed');
			await this.onServerClosed();
		}
	}

	async onServerClosed () {
		console.log('HTTP server closed');
		try {
			await Promise.all([this.readDb.end(), this.writeDb.end()]);
			console.log('Database connections closed');
		} catch (err) {
			console.error('Error closing database connections', err);
		}

		process.exit(0);
	}

	async retryOnServerClosed () {
		try {
			await this.onServerClosed();
		} catch (err) {
			console.error(`onServerClosed err ${err}`);
			process.exit(-1);
		}
	}
}

module.exports = ShutdownHandler;
