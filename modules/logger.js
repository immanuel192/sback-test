'use strict';
const winston = require('winston');

class Logger {
    log(level, mess) {
        winston.log(level, mess);
    }

    /**
     * Log message with level `info`
     */
    info(message) {
        winston.info(message);
    }

    /**
     * Log message with level `error`
     */
    error(msg) {
        winston.error(msg);
    }
}

module.exports = Logger;