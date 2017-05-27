'use strict';
const assert = require('assert');
const RedeemAction = require('../../actions/Redeem.action');

const action = new RedeemAction();

describe('Action Redeem', () => {
    const TestRedeem = function TestRedeem(domain, targetdomain) {
        const expect = `Visit ${targetdomain} to start earning cashback!`;
        const ret = action.handler(domain);

        assert.equal(ret, expect);
    };

    it('should return redeem redirect for Singapore', () => {
        const domain = 'www.shopback.sg';
        const targetdomain = 'https://www.shopback.sg';
        TestRedeem(domain, targetdomain);
    });

    it('should return redeem redirect for Malaysia', () => {
        const domain = 'www.shopback.my';
        const targetdomain = 'https://www.shopback.my';
        TestRedeem(domain, targetdomain);
    });

    it('should return redeem redirect for Indonesia', () => {
        const domain = 'www.shopback.co.id';
        const targetdomain = 'https://www.shopback.co.id';
        TestRedeem(domain, targetdomain);
    });

    it('should return redeem redirect for Taiwan', () => {
        const domain = 'www.shopback.com.tw';
        const targetdomain = 'https://www.shopback.com.tw';
        TestRedeem(domain, targetdomain);
    });

    it('should return redeem redirect for Thailand', () => {
        const domain = 'www.myshopback.co.th';
        const targetdomain = 'https://www.myshopback.co.th';
        TestRedeem(domain, targetdomain);
    });

    it('should return redeem redirect for www.shopback.com', () => {
        const domain = 'www.shopback.com';
        const targetdomain = 'https://www.shopback.com';
        TestRedeem(domain, targetdomain);
    });

    it('should return redeem redirect for www.shopback.com', () => {
        const domain = 'abc.com';
        const expect = 'No redemption';
        const ret = action.handler(domain);

        assert.equal(ret, expect);
    });

    it('should allow non-case-sentensive', () => {
        const domain = 'www.shopBACK.com';
        const targetdomain = 'https://www.shopback.com';
        TestRedeem(domain, targetdomain);
    });
});
