'use strict';
/**
 * Unit test for SbCli App
 */
const assert = require('assert');
const sinon = require('sinon');
const proxyquire = require('proxyquire');

let app;
const sandbox = sinon.sandbox.create();
const LoggerPrototype = {
    log: sandbox.stub()
};
const ExceptionHandler = sandbox.stub();
const StubOptions = {
    './modules/exceptionHandler': ExceptionHandler,
    './modules/MemStore': ''
};

describe('SbCli', () => {
    before(() => {
        const SbCli = proxyquire('../app', StubOptions);
        app = new SbCli(LoggerPrototype);
    });

    it('should call Exception handler when initialize', () => {
        assert.equal(ExceptionHandler.calledWith(LoggerPrototype), true);
    });

    context('doActions', () => {
        it('should return No input if the input array is empty', () => {
            const inp = [];
            const expectMessage = 'No input';
            const ret = app.doAction(inp);
            assert.equal(ret, expectMessage);
        });

        it('should return No input if the input array is null', () => {
            const inp = null;
            const expectMessage = 'No input';
            const ret = app.doAction(inp);
            assert.equal(ret, expectMessage);
        });
    });
});