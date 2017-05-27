'use strict';
const path = require('path');
const fs = require('fs');
const _ = require('lodash');
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
        return new Promise((resolve, reject) => {
            const dirPath = path.join(__dirname, 'actions');
            try {
                const files = fs.readdirSync(dirPath);
                _.each(files, (f) => {
                    if (f.endsWith('.action.js')) {
                        /* eslint import/no-extraneous-dependencies:1 global-require: 1 , import/no-dynamic-require: 1 */
                        const Action = require(path.join(dirPath, f));
                        const instance = new Action();
                        kv.register(instance.key, instance);
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
            return ret;
        }

        const input = _.clone(inp);
        const actionKey = input.shift().toLowerCase();
        const action = kv.resolve(actionKey);
        if (!action) {
            ret = 'Action Not Exist';
            return ret;
        }

        ret = action.handler(...input);
        return ret;
    }
}

module.exports = SbCli;
