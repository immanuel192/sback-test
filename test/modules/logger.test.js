'use strict';
const sinon = require('sinon');
const assert = require('assert');
const proxyquire = require('proxyquire');

const sandbox = sinon.sandbox.create();
const loggerHandler = new (function FakeWinston() {
    this.log = sandbox.stub();
    this.info = sandbox.stub();
    this.error = sandbox.stub();
})();
let logger;

describe('Module - Logger', () => {
    before(() => {
        const Logger = proxyquire('../../modules/logger', {
            winston: loggerHandler
        });
        logger = new Logger();
    });

    beforeEach(() => {
        sandbox.reset();
    });

    describe('log', () => {
        it('should call function log to log a message', () => {
            const expectMessage = '123';
            logger.log(expectMessage);

            assert.equal(loggerHandler.log.called, true);
            assert.equal(loggerHandler.log.calledWith(expectMessage), true);
        });

        it('should call function log with level and message', () => {
            const expectMessage = '123';
            const level = 1;
            logger.log(level, expectMessage);

            assert.equal(loggerHandler.log.calledWith(level, expectMessage), true);
        });
    });

    describe('info', () => {
        it('should call function info to log info a message', () => {
            const expectMessage = '123';
            logger.info(expectMessage);

            assert.equal(loggerHandler.info.called, true);
            assert.equal(loggerHandler.info.calledWith(expectMessage), true);
        });
    });

    describe('error', () => {
        it('should call function error to error a message', () => {
            const expectMessage = '123';
            logger.error(expectMessage);

            assert.equal(loggerHandler.error.called, true);
            assert.equal(loggerHandler.error.calledWith(expectMessage), true);
        });
    });
});