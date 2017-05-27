'use strict';
const assert = require('assert');
const SpendAction = require('../../actions/Spend.action');

const action = new SpendAction();

describe('Action Spend', () => {
    const Test = function Test(inp, expectValue) {
        const ret = action.handler(...inp);
        assert.equal(ret, expectValue);
    };

    it('should award 20% of the highest amount if every single amount is >= 50', () => {
        const inp = [50, 51, 52, 53, 54];
        const expectMessage = 'Award cashback: 10.80';
        Test(inp, expectMessage);
    });

    it('should award 15% of the highest amount if every single amount are >= 20', () => {
        const inp = [50, 40, 30, 29];
        const expectMessage = 'Award cashback: 7.50';
        Test(inp, expectMessage);
    });

    it('should award 10% of the highest if all amounts are >= 10', () => {
        const inp = [59, 40, 11, 23];
        const expectMessage = 'Award cashback: 5.90';
        Test(inp, expectMessage);
    });

    it('should award 5% of the highest as cashback for other cases', () => {
        const inp = [59, 40, 9, 23];
        const expectMessage = 'Award cashback: 2.95';
        Test(inp, expectMessage);
    });

    it('should return No cashback if total spend is 0', () => {
        const inp = [0];
        const expectMessage = 'No cashback';
        Test(inp, expectMessage);
    });

    it('should return No cashback if no spending', () => {
        const inp = [];
        const expectMessage = 'No cashback';
        Test(inp, expectMessage);
    });

    it('should accept float input value', () => {
        const inp = [59.555555, 45.96, 46.5789];
        const expectMessage = 'Award cashback: 8.93';
        Test(inp, expectMessage);
    });

    it('should ignore input string automatically', () => {
        const inp = [50, 'trung', 55, 'dang', '60'];
        const expectMessage = 'Award cashback: 12.00';
        Test(inp, expectMessage);
    });
});