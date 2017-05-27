'use strict';
const assert = require('assert');
const SignupAction = require('../../actions/Signup.action');

const action = new SignupAction();

describe('Action Signup', () => {
    it('should return signup cashack for Singapore', () => {
        const expect = 'Award bonus: 5.00 SGD';
        const domain = 'www.shopback.sg';
        const ret = action.handler(domain);

        assert.equal(ret, expect);
    });

    it('should return signup cashack for Malaysia', () => {
        const expect = 'Award bonus: 10.00 MYR';
        const domain = 'www.shopback.my';
        const ret = action.handler(domain);

        assert.equal(ret, expect);
    });

    it('should return signup cashack for Indonesia', () => {
        const expect = 'Award bonus: 25000.00 IDR';
        const domain = 'www.shopback.co.id';
        const ret = action.handler(domain);

        assert.equal(ret, expect);
    });

    it('should return signup cashack for Taiwan', () => {
        const expect = 'Award bonus: 1000.00 TWD';
        const domain = 'www.shopback.com.tw';
        const ret = action.handler(domain);

        assert.equal(ret, expect);
    });

    it('should return signup cashack for Thailand', () => {
        const expect = 'Award bonus: 500.00 THB';
        const domain = 'www.myshopback.co.th';
        const ret = action.handler(domain);

        assert.equal(ret, expect);
    });

    it('should return signup cashack for www.myshopback.com', () => {
        const expect = 'Award bonus: 5.00 USD';
        const domain = 'www.myshopback.com';
        const ret = action.handler(domain);

        assert.equal(ret, expect);
    });

    it('should not allow case sensitive', () => {
        const expect = 'Award bonus: 5.00 USD';
        const domain = 'www.MYSHOPBACK.com';
        const ret = action.handler(domain);

        assert.equal(ret, expect);
    });
});