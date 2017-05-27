'use strict';
const Logger = require('./modules/logger');
const AppCli = require('./app');

const logger = new Logger();
const app = new AppCli(logger);

app.loadActions()
    .then(() => {
        const args = [...process.argv].splice(2);
        return args;
    })
    .then((inp) => {
        return app.doAction(inp);
    })
    .then((ret) => {
        logger.log(ret);
    });
