var Rollbar = require('rollbar');
var rollbar = new Rollbar('ddbc9cf195ee4f3c9a5be068220d15f0');

// log a generic message and send to rollbar
rollbar.log('Hello world!');
Sentry.init({ dsn: 'https://94a970f3fb5a476398675801874e7c39@sentry.io/1772410' });