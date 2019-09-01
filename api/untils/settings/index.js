let dev = require('./dev');
let prod = require('./prod');

courn_environment = process.env.NODE_ENV || 'dev';


setting = courn_environment == 'dev' ? dev : prod;

setting.courn_environment = courn_environment;

setting.show_log = true;

module.exports = setting;