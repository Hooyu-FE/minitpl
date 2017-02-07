/**
 * Created by yiwei on 2017/2/7.
 * @todo init project
 */
'use strict';
const co = require('co');
const prompt = require('co-prompt');
module.exports = (project) => {
    co(function *() {
        let answer = yield prompt('[?]确定项目名称为' + project + '(yes/no):');
    });
};
