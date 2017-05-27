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
const FakeFs = {
    readdirSync: sandbox.stub()
};
const FakeMemStore = {
    register: sandbox.stub(),
    resolve: sandbox.stub()
};
const ExceptionHandler = sandbox.stub();
const StubOptions = {
    './modules/exceptionHandler': ExceptionHandler,
    './modules/MemStore': FakeMemStore,
    fs: FakeFs
};
let ExceptionHandlerCalledStatus;

describe('SbCli', () => {
    before(() => {
        const SbCli = proxyquire('../app', StubOptions);
        app = new SbCli(LoggerPrototype);
        ExceptionHandlerCalledStatus = (ExceptionHandler.calledWith(LoggerPrototype) === true);
    });

    beforeEach(() => {
        sandbox.reset();
    });

    it('should call Exception handler when initialize', () => {
        assert.equal(ExceptionHandlerCalledStatus, true);
    });

    context('loadActions', () => {
        it('shoud rejected if any exception when loading modules', () => {
            const expectMessage = 'fake error';

            FakeFs.readdirSync.throws(new Error(expectMessage));
            return app.loadActions()
                .then(() => {
                    throw new Error('loadActions complete sucessfully when having exception');
                })
                .catch((err) => {
                    assert.equal(err.message, expectMessage);
                });
        });
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

        it('should return Action Not Exist if action does not exist', () => {
            const inp = ['unknown-action'];
            const expectMessage = 'Action Not Exist';
            FakeMemStore.resolve.returns(null);
            const ret = app.doAction(inp);
            assert.equal(ret, expectMessage);
        });
    });
});