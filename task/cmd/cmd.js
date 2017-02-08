/**
 * Created by yiwei on 2017/2/7.
 * @todo create command
 *
 * minitpl i|init [projectName]
 *
 */
const program = require('commander');
const pkg = require('../../package');

program
    .version(pkg.version)
    .command('init [projectName]')
    .description('Init a project in current folder')
    .alias('i')
    .action((projectName) => {
        require('../prompt')(projectName || 'newproject')
    });

program.parse(process.argv);

if(!program.args.length){
    program.help()
}

