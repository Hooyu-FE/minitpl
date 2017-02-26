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
const util = require('./util/util');

let cb = (err) => {
    util.log('error', err);
    process.exit(-1)
};

module.exports = {
    /**
     * mkdir project root dir
     * @param project [project name]
     * @param templates [templates array]
     * @param type [act type]
     */
    gen: (project, templates, type) => {
        util.log('progress', 'Start generator ' + project);
        exec('mkdir ' + project, (err, stdout, stderr) => {
            if (err) cb(err);
            co(require('./fs-copy')(path.join(path.dirname(__dirname), 'template'), path.join(process.cwd(), project), templates, type));
        });
    }
};
