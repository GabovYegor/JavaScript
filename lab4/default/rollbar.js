let Raven = require('raven')
Raven.config('https://94a970f3fb5a476398675801874e7c39@sentry.io/1772410')

try {
    t()
} catch (e) {
    Raven.captureException(e)
    Raven.captureMessage('Hello')
}

let winston = require('winston');
winston.addColors({
    silly: 'magenta',
    debug: 'blue',
    verbose: 'cyan',
    info: 'green',
    warn: 'yellow',
    error: 'red'
});
let logger = new (winston.createLogger)({
    levels: {
        debug: 0,
        info: 1,
        warn: 2,
        error: 3
    },
    transports: [
        new (winston.transports.Console)(),
        new (winston.transports.File) ( { filename: 'kekes.log' } )
    ]
})

logger.info('debug', 'info')
logger.debug('keke')

