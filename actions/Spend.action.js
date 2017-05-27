'use strict';
/**
 *
spend <amount>[<amount>...]
Return cashback awarded rounded to 2 decimal places. Either:
- award 20% of the highest amount if every single amount is >= 50;
- award 15% of the highest amount if every single amount are >= 20;
- award 10% of the highest if all amounts are >= 10;
- or award 5% of the highest as cashback
 */
const BaseAction = require('./BaseAction');

/**
 *
 *
 * @param {Number[]} amounts
 * @returns
 */
function calculateCashback(amounts) {
    let highest = 0;
    const data = [];
    amounts.forEach((v) => {
        const n = Number(v);
        if (n >= 0) {
            data.push(n);
            (n > highest) && (highest = n);
        }
    });

    const result = {
        50: true, 20: true, 10: true
    };

    data.forEach((v) => {
        result[50] = result[50] && v >= 50;
        result[20] = result[20] && v >= 20;
        result[10] = result[10] && v >= 10;
    });

    if (result[50]) {
        return (20 * highest) / 100;
    }

    if (result[20]) {
        return (15 * highest) / 100;
    }

    if (result[10]) {
        return (10 * highest) / 100;
    }

    return (5 * highest) / 100;
}

class SpendAction extends BaseAction {
    get name() {
        return 'spend';
    }

    get key() {
        return 'spend';
    }

    /**
     *
     *
     * @param {any[]} amounts
     *
     * @memberof SpendAction
     */
    handler(...amounts) {
        const cashback = calculateCashback(amounts);

        if (cashback === 0) {
            return 'No cashback';
        }
        const cashbackAmount = `Award cashback: ${cashback.toFixed(2)}`;
        return cashbackAmount;
    }
}

module.exports = SpendAction;