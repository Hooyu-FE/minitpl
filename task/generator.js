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

let cb = (err) => {
    throw err;
};
let src = '/Users/yiwei/Desktop/my_study/Hooyu-FE/minitpl/template',
    dist = '/Users/yiwei/Desktop/my_study/Hooyu-FE/newproject';

module.exports = {
    gen: (project) => {
        exec('mkdir ' + project, (err, stdout, stderr) => {
            if (err) process.exit(-1);
            co(require('./copy')(src, dist, cb));
        });
    }
};
