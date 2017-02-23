/**
 * Created by yiwei on 2017/2/7.
 * @todo init project
 */
'use strict';
const co = require('co');
const inquirer = require('inquirer');

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
        message: '请重新输入项目名称:'
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
     * Get act type
     * @param type
     */
    let getActType = function* (type) {
        let tpl = null;
        if (type == 'multi-page') {
            tpl = yield _prompt(PROMPTS[3]);
        } else {
            tpl = {templates: 'index'};
        }
        require('./generator').gen(_projectName, tpl.templates.slice(','));
    };


    /**
     * start handler prompt
     * @param name
     */
    let prompt = function* (name) {
        _projectName = name || _projectName;
        let confirmActName = yield _prompt(Object.assign(PROMPTS[1], {message: '确定项目名称为' + _projectName + ':'}));
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
