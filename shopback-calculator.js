'use strict';
const Logger = require('./modules/logger');
const logger = new Logger();

// $ node shopback-calculator.js signup www.shopback.sg
logger.log('Award bonus: 5.00 SGD');
// $ node shopback-calculator.js signup www.shopback.my
logger.log('Award bonus: 10.00 MYR');
// $ node shopback-calculator.js spend 0
logger.log('No cashback');
// $ node shopback-calculator.js spend 20
logger.log('Award cashback: 3.00');
// $ node shopback-calculator.js spend 100 5
logger.log('Award cashback: 5.00');
// $ node shopback-calculator.js spend 10 10 10
logger.log('Award cashback: 1.00');
// $ node shopback-calculator.js spend 20 10 15
logger.log('Award cashback: 2.00');
// $ node shopback-calculator.js redeem www.shopback.sg
logger.log('Visit http://www.shopback.sg to start earning cashback!');
// $ node shopback-calculator.js redeem www.shopback.my
logger.log('Visit http://www.shopback.my to start earning cashback!');
