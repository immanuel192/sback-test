'use strict';
const ExceptionHandler = require('./modules/exceptionHandler');

/**
 * Main shopback cli application
 */

class SbCli {
    constructor(logger) {
        this.logger = logger;
        ExceptionHandler(logger);
    }
}

module.exports = SbCli;
