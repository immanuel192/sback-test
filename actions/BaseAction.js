'use strict';
/**
 * An action should have the following information:
 * - name: to identify
 * - key: to check from the command line inputs
 * - handler: function
 */

const _ = require('lodash');

/**
 * Base Action Abstract Class
 *
 * @class BaseAction
 */
class BaseAction {
    constructor() {
        if (this.constructor === BaseAction) {
            throw Error('BaseAction can not be used directly');
        }

        ['name', 'key'].forEach((n) => {
            if (this[n] === undefined || this[n].length === 0) {
                throw Error(`"${n}" should be defined`);
            }
        });

        if (this.handler === undefined || !_.isFunction(this.handler)) {
            throw Error('"handler" function should be defined');
        }
    }
}

module.exports = BaseAction;