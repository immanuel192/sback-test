'use strict';
const assert = require('assert');
const sinon = require('sinon');
const proxyquire = require('proxyquire');

const sandbox = sinon.sandbox.create();
const LoggerPrototype = {
    log: sandbox.stub()
};

const FakeAppPrototype = {
    loadActions: sandbox.stub(),
    doAction: sandbox.stub()
};

function FakeLogger() {
    Object.assign(this, LoggerPrototype);
}

function FakeApp() {
    Object.assign(this, FakeAppPrototype);
}

describe('shopback-calculator', () => {
    it('should load the app with correct flow ', () => {
        const expect = 123;

        FakeAppPrototype.loadActions.returns(Promise.resolve());
        FakeAppPrototype.doAction.returns({
            then: (callback) => {
                assert.equal(FakeAppPrototype.loadActions.called, true);
                assert.equal(FakeAppPrototype.doAction.called, true);

                callback(expect);
                assert.equal(LoggerPrototype.log.calledWith(expect), true);
            }
        });

        proxyquire('../shopback-calculator', {
            './modules/logger': FakeLogger,
            './app': FakeApp
        });
    });
});
