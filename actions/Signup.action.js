'use strict';
/**
 * signup <domain>
Award corresponding bonus amount with currency for each of:
www.shopback.sg => SGD 5
www.shopback.my => MYR 10
www.shopback.co.id => IDR 25.000
www.shopback.com.tw => TWD 1000
www.myshopback.co.th => THB 500
www.myshopback.com => USD 5
 */
const SignupCashBackData = {
    'www.shopback.sg': {
        amount: 5,
        currency: 'SGD'
    },
    'www.shopback.my': {
        amount: 10,
        currency: 'MYR'
    },
    'www.shopback.co.id': {
        amount: 25000,
        currency: 'IDR'
    },
    'www.shopback.com.tw': {
        amount: 1000,
        currency: 'TWD'
    },
    'www.myshopback.co.th': {
        amount: 500,
        currency: 'THB'
    },
    'www.myshopback.com': {
        amount: 5,
        currency: 'USD'
    }
};

const BaseAction = require('./BaseAction');

function formatNumber(num) {
    return num.toFixed(2);
}

class SignupAction extends BaseAction {
    get name() {
        return 'signup';
    }

    get key() {
        return 'signup';
    }

    handler(domain) {
        const lowerCaseDomain = domain.toLowerCase();
        if (Object.prototype.hasOwnProperty.call(SignupCashBackData, lowerCaseDomain)) {
            const cashback = SignupCashBackData[lowerCaseDomain];
            const ret = `Award bonus: ${formatNumber(cashback.amount)} ${cashback.currency}`;
            return ret;
        }
        return 'No cashback';
    }
}

module.exports = SignupAction;