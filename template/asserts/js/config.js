/**
 * @todo 全局配置选项
 *
 * ####### config  ######
 */
let location = window.location.href,
    protocol = /^http:$/i.test(window.location.protocol),
    loginState=  COMMONUTIL.loginState(),
    actId = util.getQueryVal('actId', location),
    zuid = util.getQueryVal('zuid', location) || loginState.uuid,
    pf = util.getQueryVal('pf', location),
    env = util.getQueryVal('env', location) || 'live',
    from = util.getQueryVal('from', location),
    channel = util.getQueryVal('channel', location),
    ctype = util.sys.isIOS()? 1: 2,
    dataType = "jsonp";

export default {
    location,
    protocol,
    loginState,
    actId,
    zuid,
    pf,
    env,
    from,
    channel,
    ctype,
    dataType
};