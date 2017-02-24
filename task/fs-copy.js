/**
 * Created by yiwei on 2017/2/10.
 * @todo file process
 */
'use strict';
const path = require('path');
const co = require('co');
const fs = require('fs');
const log = require('./util/log');

module.exports = (src, dist, cb) => {
    let _src = src,
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
     * Start copy
     * @param item
     */
    let copy = function* (item){
        let exits = yield access(item.dist);
        if (item.stat.isFile()) {
            fs.createReadStream(item.src).pipe(fs.createWriteStream(item.dist));
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
        log('success', 'Init ' + __dir[__dir.length-1] + ' success!');
    };

    co(gen);
};