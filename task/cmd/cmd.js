/**
 * Created by yiwei on 2017/2/7.
 * @todo create command
 *##########################
 * minitpl -h
 * minitpl init projectName
 *
 */
const program = require('commander');
const pkg = require('../../package');

program
    .version(pkg.version)
    .command('init <projectName>')
    .description('Init project')
    .action((projectName) => {
        require('../init')(projectName)
    });

program.parse(process.argv);

if(!program.args.length){
    program.help()
}

