'use strict';
const ExceptionHandler = require('../../modules/exceptionHandler');
const sinon = require('sinon');
const assert = require('assert');

const sandbox = sinon.sandbox.create();
const fakeLogger = {
    info: sandbox.stub(),
    error: sandbox.stub()
};

const ProcessHandler = new (function ProcessHandler() {
    this.exit = sandbox.stub();

    this.eventHandlers = {};

    this.on = (event, callback) => {
        this.eventHandlers[event] = callback;
    };

    this.invoke = (event, params) => {
        if (this.eventHandlers[event]) {
            return this.eventHandlers[event](params);
        }

        return null;
    };
})();


describe('exceptionHandler', () => {
    before(() => {
        ExceptionHandler(fakeLogger, ProcessHandler);
    });

    beforeEach(() => {
        sandbox.reset();
    });

    it('should call log info when SIGTERM', () => {
        const expectMessage = 'App closing SIGTERM';
        ProcessHandler.invoke('SIGTERM');
        assert.equal(fakeLogger.info.calledWith(expectMessage), true);
    });

    it('should call log info when SIGINT', () => {
        const expectMessage = 'App closing SIGINT';
        ProcessHandler.invoke('SIGINT');
        assert.equal(fakeLogger.info.calledWith(expectMessage), true);
    });

    it('should print exception stack and exit when uncaughtException', () => {
        const params = {
            message: 'error message',
            stack: 'error stack'
        };
        const expectFirstCallMessage = `uncaughtException - ${params.message}`;
        const expectSecondCallMessage = params.stack;

        ProcessHandler.invoke('uncaughtException', params);
        assert.equal(fakeLogger.error.calledTwice, true);
        assert.equal(fakeLogger.error.firstCall.calledWith(expectFirstCallMessage), true);
        assert.equal(fakeLogger.error.secondCall.calledWith(expectSecondCallMessage), true);
        assert.equal(ProcessHandler.exit.calledWith(1), true);
    });

    it('should show log info message when unhandledRejection', () => {
        ProcessHandler.invoke('unhandledRejection');
        assert.equal(fakeLogger.info.called, true);
    });
});