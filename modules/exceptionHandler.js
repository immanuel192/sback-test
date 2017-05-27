'use strict';

/**
 * Error handlers
 *
 * @param {Logger} logger
 * @param {Process} handler
 */
module.exports = function errorHandlers(logger, handler) {
    const process = handler || global.process;

    process.on('SIGTERM', () => {
        logger.info('App closing SIGTERM');
    });

    process.on('SIGINT', () => {
        logger.info('App closing SIGINT');
    });

    process.on('uncaughtException', (err) => {
        logger.error(`uncaughtException - ${err.message}`);
        logger.error(err.stack);
        process.exit(1);
    });

    process.on('unhandledRejection', (reason, p) => {
        logger.info(`Unhandled Rejection at: Promise ${p}reason:${reason}`);
    });
};