/**
 * Created by yiwei on 2017/2/10.
 * @todo file process
 */
'use strict';
const path = require('path');
const co = require('co');
const fs = require('fs');
const util = require('./util/util');
var writeLineStream = require('lei-stream').writeLine;

/**
 * file operating
 * @param src
 * @param dist
 * @param templates
 * @param type
 */
module.exports = (src, dist, templates, type) => {
    let _src = src,
        _type = type,
        _templates = templates,
        _dist = dist;


    /**
     * check if the `dir` exists
     * @param dir
     */
    let access = (dir) => {
        return new Promise((resolve, reject) => {
            fs.access(dist, (err) => {
                if (err) {
                    reject(err);
                }
                resolve(null);
            });
        });
    };

    /**
     * Read a dir
     * @param dir
     */
    let readDir = (dir) => {
        return new Promise((resolve, reject) => {
            fs.readdir(dir, (err, paths) => {
                if (err) {
                    reject(err);
                }
                resolve(paths);
            });
        });
    };


    /**
     * Check file stat
     * @param paths
     * @param src
     * @param dist
     * @returns {Promise}
     */
    let stat = (paths, src, dist) => {
        let __src = src || _src,
            __dist = dist || _dist;
        var promises = paths.map((_path, index) => {
            return new Promise((resolve, reject) => {
                let _src_ = path.join(__src, _path);
                let _dist_ = path.join(__dist, _path);
                fs.stat(_src_, (err, stat) => {
                    if (err) reject(err);
                    resolve({
                        src: _src_,
                        dist: _dist_,
                        stat
                    });
                });
            });
        });
        return Promise.all(promises);
    };


    /**
     * rewrite chunk.config.json file
     * @param dest
     * @param tpls
     */
    let reWriteChunkConfig = (dest, tpls) => {
        let data = {
            jsChunk: {},
            htmlChunk: {},
            publicPath: {
                pro: "http://activity.zb.mi.com/live/",
                staging: ""
            }
        };
        tpls.forEach((tpl, index) => {
            data.jsChunk[tpl] = path.join('asserts/js/', tpl + '.js');
            data.htmlChunk[tpl] = {
                template: tpl + '.html',
                chunks: [tpl]
            };
        });
        var writeStream = writeLineStream(fs.createWriteStream(dest));
        writeStream.write(JSON.stringify(data, null, 2));
        writeStream.end(() => {
            util.log('success', 'Init ' + path.parse(dest).base + ' success!');
        });
    };


    /**
     * Start copy
     * @param item
     */
    let copy = function* (item){
        let exits = yield access(item.dist);
        if (item.stat.isFile()) {
            let parseSrc = path.parse(item.src);
            if (_type == 'multi-page' && /chunk.config.json/g.test(parseSrc.base)) {
                reWriteChunkConfig(item.dist, _templates);
            } else {
                let writeStream = fs.createWriteStream(item.dist);
                fs.createReadStream(item.src).pipe(writeStream);
                writeStream.on('close', () => {
                    util.log('success', 'Init ' + parseSrc.base + ' success!');
                });
            }
        } else if (item.stat.isDirectory()) {
            if (!exits) {
                fs.mkdirSync(item.dist);
            }
            yield* gen(item.src, item.dist);
        }
    };

    /**
     * Start init
     * @param src
     * @param dist
     */
    let gen = function* (src, dist) {
        let __src = src || _src,
            __dist = dist ||_dist;
        let paths = yield readDir(__src);
        let stats = yield stat(paths, __src, __dist);
        yield stats.map(copy);
        let __dir = src.split(path.sep);
        util.log('success', 'Init ' +  __dir[__dir.length-1] + ' success!');
    };

    co(gen);
};