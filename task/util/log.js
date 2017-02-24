/**
 * Created by yiwei on 2017/2/24.
 */
const chalk = require('chalk');

/**
 * module log
 * @param type
 * @param msg
 */
module.exports = (type, msg) => {
    switch (type) {
        case 'error':
            console.log(chalk.bold.red('✗ ' + msg));
            break;
        case 'warn':
            console.log(chalk.bold.yellow('[!] ' + msg));
            break;
        case 'success':
            console.log(chalk.bold.green('✔ ' + msg));
            break;
        case 'progress':
            console.log(chalk.bold.green(msg + '...'));
            break;
        default:
            console.log(chalk.bold.green(msg));
            break;
    }
};