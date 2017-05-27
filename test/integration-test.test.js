'use strict';
const Logger = require('../modules/logger');
const AppCli = require('../app');
const assert = require('assert');

const logger = new Logger();
const app = new AppCli(logger);
const testCases = [
    ['signup', 'www.shopback.sg', 'Award bonus: 5.00 SGD'],
    ['signup', 'www.shopback.my', 'Award bonus: 10.00 MYR'],
    ['spend', '0', 'No cashback'],
    ['spend', '20', 'Award cashback: 3.00'],
    ['spend', '100', '5', 'Award cashback: 5.00'],
    ['spend', '10', '10', '10', 'Award cashback: 1.00'],
    ['spend', '20', '10', '15', 'Award cashback: 2.00'],
    ['redeem', 'www.shopback.sg', 'Visit https://www.shopback.sg to start earning cashback!'],
    ['redeem', 'www.shopback.my', 'Visit https://www.shopback.my to start earning cashback!']
];
describe('Integration Test', () => {
    before(() => {
        return app.loadActions();
    });

    testCases.forEach((test) => {
        it(`should pass the test ${test}`, () => {
            const expect = test.splice(test.length - 1, 1);
            const ret = app.doAction(test);
            assert.equal(ret, expect);
        });
    });
});