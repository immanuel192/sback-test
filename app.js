'use strict';
const ExceptionHandler = require('./modules/exceptionHandler');
const kv = require('./modules/MemStore');

/**
 * Main shopback cli application
 */

class SbCli {
    constructor(logger) {
        this.logger = logger;
        ExceptionHandler(logger);
    }

    /**
     * Load all actions dynamically
     *
     * @return {Promise}
     * @memberof SbCli
     */
    loadActions() {
        return Promise.resolve();
    }

    /**
     * Do action
     *
     * @param {String[]} inp
     *
     * @memberof SbCli
     */
    doAction(inp) {
        let ret = '';
        if (inp.length === 0) {
            ret = 'No input';
        }

        console.log(inp);
        return ret;

        // // $ node shopback-calculator.js signup www.shopback.sg
        // logger.log('Award bonus: 5.00 SGD');
        // // $ node shopback-calculator.js signup www.shopback.my
        // logger.log('Award bonus: 10.00 MYR');
        // // $ node shopback-calculator.js spend 0
        // logger.log('No cashback');
        // // $ node shopback-calculator.js spend 20
        // logger.log('Award cashback: 3.00');
        // // $ node shopback-calculator.js spend 100 5
        // logger.log('Award cashback: 5.00');
        // // $ node shopback-calculator.js spend 10 10 10
        // logger.log('Award cashback: 1.00');
        // // $ node shopback-calculator.js spend 20 10 15
        // logger.log('Award cashback: 2.00');
        // // $ node shopback-calculator.js redeem www.shopback.sg
        // logger.log('Visit http://www.shopback.sg to start earning cashback!');
        // // $ node shopback-calculator.js redeem www.shopback.my
        // logger.log('Visit http://www.shopback.my to start earning cashback!');
    }
}

module.exports = SbCli;
