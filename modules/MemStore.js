'use strict';

const kvCol = {};
/**
 * Key / value mem store
 *
 * @class MemStore
 */
class MemStore {
    /**
     * Register object with a name
     *
     * @param {string} name
     * @param {any} obj
     */
    register(name, obj) {
        kvCol[name] = obj;
    }

    /**
     * Resolve a registered name
     *
     * @param {string} name
     * @return {mixed}
     */
    resolve(name) {
        return Object.prototype.hasOwnProperty.call(kvCol, name) ? kvCol[name] : undefined;
    }
}

module.exports = exports = new MemStore();