'use strict';
const path = require('path');
const fs = require('fs');
const _ = require('lodash');
const ExceptionHandler = require('./modules/exceptionHandler');
// const kv = require('./modules/MemStore');

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
        return new Promise((resolve, reject) => {
            const dirPath = path.join(__dirname, 'actions');
            try {
                const files = fs.readdirSync(dirPath);
                _.each(files, (f) => {
                    if (f.endsWith('.action.js')) {
                        /* eslint import/no-extraneous-dependencies:1 global-require: 1 , import/no-dynamic-require: 1 */
                        require(f);
                    }
                });
            }
            catch (err) {
                return reject(err);
            }

            return resolve();
        });
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
        if (!inp || inp.length === 0) {
            ret = 'No input';
        }

        // console.log(inp);
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
