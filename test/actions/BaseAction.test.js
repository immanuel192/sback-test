'use strict';
const assert = require('assert');
const BaseAction = require('../../actions/BaseAction');

class ActionWithNoNameAndKey extends BaseAction {
}

class ActionWithName extends BaseAction {
    get name() {
        return 'my name';
    }
}

class ActionWithNameAndKey extends BaseAction {
    get name() {
        return 'my name';
    }

    get key() {
        return 'my key';
    }
}

describe('BaseAction', () => {
    context('Abstract Validation', () => {
        it('should throw error if call BaseAction constructor directly', () => {
            const expectMessage = 'BaseAction can not be used directly';

            try {
                const x = new BaseAction();
                throw new Error('BaseAction constructor run sucessfully', x);
            }
            catch (err) {
                assert.equal(err.message, expectMessage);
            }
        });

        it('should throw exception if no property name defined', () => {
            const expectMessage = '"name" should be defined';

            try {
                const x = new ActionWithNoNameAndKey();
                throw new Error('ActionWithNoNameAndKey constructor run sucessfully', x);
            }
            catch (err) {
                assert.equal(err.message, expectMessage);
            }
        });

        it('should throw exception if no property key defined', () => {
            const expectMessage = '"key" should be defined';

            try {
                const x = new ActionWithName();
                throw new Error('ActionWithName constructor run sucessfully', x);
            }
            catch (err) {
                assert.equal(err.message, expectMessage);
            }
        });

        it('should throw exception if no handler', () => {
            const expectMessage = '"handler" function should be defined';

            try {
                const x = new ActionWithNameAndKey();
                throw new Error('ActionWithNameAndKey constructor run sucessfully', x);
            }
            catch (err) {
                assert.equal(err.message, expectMessage);
            }
        });
    });
});