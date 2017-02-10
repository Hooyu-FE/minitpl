/**
 * Created by yiwei on 2017/2/10.
 * @todo file process
 */
'use strict';
const path = require('path');
const co = require('co');
const fs = require('fs');

module.exports= (srsPath, dest, cb) => {
    let src = srsPath,
        dist = dest;
    co(function* copyDir(_src, _dist){
        src = _src || src;
        dist = _dist || dist;

        function* _copy() {
            let paths = fs.readdirSync(src);
            var promises = paths.map((_path, index) => {
                return new Promise((resolve, reject) => {
                    let _src = path.join(src, _path);
                    let _dist = path.join(dist, _path);
                    let stat = fs.statSync(_src);
                    if (!!stat) {
                        resolve({
                            _src,
                            _dist,
                            stat
                        });
                    } else {
                        reject(stat);
                    }
                });
            });
            return yield Promise.all(promises);
        }

        function* access() {
            return yield new Promise((resolve, reject) => {
                fs.access(dist, (err) => {
                    if (err) {
                        reject(err);
                    }
                    resolve(null);
                });
            });
        }


        co(access)
            .then(
            (value) => {
                co(_copy)
                    .then(
                    (res) => {
                        res.forEach((item, index) => {
                            if (item.stat.isFile()) {
                                fs.createReadStream(item._src).pipe(fs.createWriteStream(item._dist));
                            } else if (item.stat.isDirectory()) {
                                yield* copyDir(res._src, res._dist);
                            }
                        });
                    },
                    (err) => {
                        cb(err);
                    }
                );
            },
            (err) => {
                fs.mkdirSync(dist);
                yield* copyDir();
            }
        );
    });
};