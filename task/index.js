/**
 * Created by yiwei on 2017/2/8.
 * @todo start generator project
 */
'use strict';
const child_process = require('child_process');
const path = require('path');
const exec = child_process.exec;
const co = require('co');
const fs = require('fs');
const log = require('./util/log');

let cb = (err) => {
    log('error', err);
    process.exit(-1)
};

module.exports = {
    gen: (project, templates) => {
        log('progress', 'Start generator ' + project);
        exec('mkdir ' + project, (err, stdout, stderr) => {
            if (err) cb(err);
            co(require('./fs-copy')(path.join(path.dirname(__dirname), 'template'), path.join(process.cwd(), project), cb));
        });
    }
};
