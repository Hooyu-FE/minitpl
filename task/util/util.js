/**
 * Created by yiwei on 2017/2/24.
 */
'use strict';
const chalk = require('chalk');

function* entries(obj) {
    for (let key of Object.keys(obj)) {
        yield key;
    }
}

module.exports = {
    /**
     * module log
     * @param type
     * @param msg
     */
    log: (type, msg) => {
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
                console.log(chalk.bold.blue(msg + '...'));
                break;
            default:
                console.log(chalk.bold.green(msg));
                break;
        }
    },
    /**
     * Array repeated detection
     * @param arr
     */
    isRepeated: (arr) => {
        let repeated = {
            isRepeated: false
        };
        if (!Array.isArray(arr)) process.exit(-1);
        if (Array.isArray(arr) && arr.length == 1) return repeated;
        let tables = {};
        arr.forEach((item) => {
            if (!tables[item]) {
                tables[item] = 1;
            } else {
                tables[item] += 1;
            }
        });
        for (let key of entries(tables)) {
            if (tables[key] > 1) {
                repeated.isRepeated = true;
                repeated.key = key;
                break;
            }
        }
        return repeated;
    }
};