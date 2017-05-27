'use strict';
const assert = require('assert');
const sinon = require('sinon');
const proxyquire = require('proxyquire');

const LoggerPrototype = {
    log: sinon.stub()
};
function FakeLogger() {
    Object.assign(this, LoggerPrototype);
}

describe('Fake test', () => {
    before(() => {
        proxyquire('../shopback-calculator', {
            './modules/logger': FakeLogger
        });
    });

    it('should return award 5SGD when signup with shopback Singapore', () => {
        const expect = 'Award bonus: 5.00 SGD';
        assert.equal(LoggerPrototype.log.firstCall.calledWith(expect), true);
    });
});
