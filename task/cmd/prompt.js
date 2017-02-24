/**
 * Created by yiwei on 2017/2/7.
 * @todo init project
 */
'use strict';
const co = require('co');
const inquirer = require('inquirer');
const chalk = require('chalk');
const fs = require('fs');
const path = require('path');
const log = require('../util/log');


const PROMPTS = [
    { // 项目类型
        type: 'list',
        name: 'type',
        message: '请选择需要创建的活动类型? ',
        choices: [
            {
                name: '单页面活动',
                value: 'single-page'
            },
            {
                name: '多页面活动',
                value: 'multi-page'
            }
        ]
    },
    { // 活动名称确认
        type: 'confirm',
        name: 'actName'
    },
    { // 输入新的活动名称
        type: 'input',
        name: 'newActName',
        message: '请重新输入活动名称:'
    },
    { // 输入页面名称
        type: 'input',
        name: 'templates',
        message: '请输入每个页面的名称（以`,`隔开, eg: index,index2,index3...）:'
    }
];

module.exports = (projectName) => {
    let _projectName = projectName;
    /**
     * Launch the prompt interface
     * @returns {Promise}
     */
    let _prompt = (prompts, cb) => {
        return inquirer.prompt(prompts, cb);
    };

    /**
     * invoke module `generator`
     */
    let generator = function (templates) {
        if (!!fs.existsSync(path.join(process.cwd(), _projectName))) {
            log('warn', '当前目录已存在' +  _projectName);
            process.exit(-1);
        } else {
            require('../index').gen(_projectName, templates);
        }
    };

    /**
     * Get act type
     * @param type
     */
    let getActType = function* (type) {
        let tpl = null;
        if (type == 'multi-page') {
            tpl = yield _prompt(PROMPTS[3]);
            if (!tpl.templates) {
                yield* getActType('multi-page');
            }
        } else {
            tpl = {templates: 'index'};
        }
        generator(tpl.templates.slice(','));
    };


    /**
     * start handler prompt
     * @param name
     */
    let prompt = function* (name) {
        _projectName = name || _projectName;
        let confirmActName = yield _prompt(Object.assign(PROMPTS[1], {message: '活动名称确定为' + _projectName + ':'}));
        let actType = null;
        let reInput = null;
        if (!!confirmActName.actName) {
            actType = yield _prompt(PROMPTS[0]);
            yield* getActType(actType.type);
        } else {
            reInput = yield _prompt(PROMPTS[2]);
            yield* prompt(reInput.newActName);
        }
    };

    co(prompt);
};
