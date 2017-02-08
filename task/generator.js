/**
 * Created by yiwei on 2017/2/8.
 * @todo start generator project
 */
const exec = require('child_process').exec;
module.exports = (project) => {
    exec('mkdir ' + project + '&& cd ' + project, (error, stdout, stderr) => {
        if (error) throw error;
    });
};