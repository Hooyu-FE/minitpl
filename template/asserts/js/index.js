/**
 * @todo 入口文件
 * #######  chunk  #####
 */
"use strict";
require('../../sass/index/index.scss');
import config from './config.js';
(() => {
    // api map
    let api = new Map([
        'live', new Map([
            'index', 'replace your url'
        ]),
        'staging', new Map([
            'index', 'replace your url'
        ]),
        'test', new Map([
            'index', 'url'
        ])
    ]);

    // 所用常量集合
    const VARIABLES = {
        imgPath: './img/'
    };

    //入口处理函数
    let ajaxHandler = () => {
        // 隐藏loading,展示内容
        COMMONUTIL.statistics({
            curpage: '',
            curpageid: config.actId || '',
            from: config.pf || config.channel || config.from,
            fuid: 'show',
            uid: config.loginState.uuid
        }, () => {
            "use strict";
            vm.$broadcast('hide-loading', {
                show: '.container'
            });
        });
    };

    // 初始化
    let init = () => {
        COMMONUTIL.fetch({
            url: api.get(config.env).get('index').host + api.get(config.env).get('index').path,
            dataType: config.dataType,
            jsonpCallback: '',
            data: {
                uuid: config.loginState.uuid,
                st: decodeURIComponent(config.loginState.st)
            }
        }).then(
            (res) => {
                "use strict";
                if (res.code == 0) {
                    // write your logic code
                    //
                    //
                    //
                    //
                    //
                }
                ajaxHandler && ajaxHandler();
            },
            (err) => {
                "use strict";
                ajaxHandler && ajaxHandler();
            }
        );
    };

    var vm = new Vue({
        el: '#main',
        data: {
            load: {
                msg: {
                    style: {
                        'color': 'rgb(255, 188, 33)'
                    },
                    text:'正在玩命加载'
                },
                roundStyle: {
                    'border': '5px solid rgb(255, 188, 33)',
                    'border-left-color': 'rgba(255, 188, 33,0.5)'
                },
                files: [
                    VARIABLES.imgPath + 'replace your image'
                    //
                    //
                    //
                    //
                    //
                ]
            }
        },
        events: {

        },
        methods: {
            loadProcess: (len, currentLen) => {
                if (currentLen == 1) {

                }
            },
            // 监听预加载资源完成
            loadComplete: () => {
                init && init();
            }
        },
        components: {
            'c-loading': require('c-loading'),
            'c-logic': require('../../components/c-logic')
        },
        directives: {

        }
    });
})();