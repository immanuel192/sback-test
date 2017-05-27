'use strict';
/**
 * redeem <domain>
Direct user to visit corresponding websites
www.shopback.sg => https://www.shopback.sg
www.shopback.my => https://www.shopback.my
www.shopback.co.id => https://www.shopback.co.id
www.shopback.com.tw => https://www.shopback.com.tw
www.myshopback.co.th => https://www.myshopback.co.th
www.shopback.com => https://www.shopback.com

Other case return No redemption
 */
const RedeemDomainConvert = {
    'www.shopback.sg': 'https://www.shopback.sg',
    'www.shopback.my': 'https://www.shopback.my',
    'www.shopback.co.id': 'https://www.shopback.co.id',
    'www.shopback.com.tw': 'https://www.shopback.com.tw',
    'www.myshopback.co.th': 'https://www.myshopback.co.th',
    'www.shopback.com': 'https://www.shopback.com'
};

const BaseAction = require('./BaseAction');

class RedeemAction extends BaseAction {
    get name() {
        return 'redeem';
    }

    get key() {
        return 'redeem';
    }

    handler(domain) {
        const lowerCaseDomain = domain.toLowerCase();
        if (Object.prototype.hasOwnProperty.call(RedeemDomainConvert, lowerCaseDomain)) {
            const target = RedeemDomainConvert[lowerCaseDomain];
            const ret = `Visit ${target} to start earning cashback!`;
            return ret;
        }
        return 'No redemption';
    }
}

module.exports = RedeemAction;