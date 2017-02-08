/**
 * Created by yiwei on 2017/2/7.
 * @todo init project
 */
'use strict';
const co = require('co');
const prompt = require('co-prompt');
const chalk = require('chalk');

module.exports = (_projectName) => {
    co(function* step(project) {
        let determineProjectName = yield prompt(chalk.red('[?]确定项目名称为' + chalk.underline.bgBlue(project || _projectName) + '(yes/no):'));
        if(determineProjectName != 'yes' && determineProjectName != 'no') {
            yield* step();
        } else if (determineProjectName == 'no') {
            co(function* newProjectName() {
                let modifyProjectName = yield prompt(chalk.green('[!]请重新输入项目名称:'));
                if (!modifyProjectName) {
                    yield* newProjectName();
                } else {
                    yield* step(modifyProjectName);
                }
            });
        } else {
            require('./generator')(project || _projectName);
        }
    })
};
