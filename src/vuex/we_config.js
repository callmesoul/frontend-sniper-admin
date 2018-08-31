import Api from '../api/index.js'
import wx from 'weixin-js-sdk'

//sha1加密-start
var hexcase = 0; /*   hex   output   format.   0   -   lowercase;   1   -   uppercase                 */
var chrsz = 8; /*   bits   per   input   character.   8   -   ASCII;   16   -   Unicode             */

function hex_sha1(s) {
    return binb2hex(core_sha1(str2binb(s), s.length * chrsz));
}

function core_sha1(x, len) {
    /*   append   padding   */
    x[len >> 5] |= 0x80 << (24 - len % 32);
    x[((len + 64 >> 9) << 4) + 15] = len;

    var w = Array(80);
    var a = 1732584193;
    var b = -271733879;
    var c = -1732584194;
    var d = 271733878;
    var e = -1009589776;

    for (var i = 0; i < x.length; i += 16) {
        var olda = a;
        var oldb = b;
        var oldc = c;
        var oldd = d;
        var olde = e;

        for (var j = 0; j < 80; j++) {
            if (j < 16) w[j] = x[i + j];
            else w[j] = rol(w[j - 3] ^ w[j - 8] ^ w[j - 14] ^ w[j - 16], 1);
            var t = safe_add(safe_add(rol(a, 5), sha1_ft(j, b, c, d)), safe_add(safe_add(e, w[j]), sha1_kt(j)));
            e = d;
            d = c;
            c = rol(b, 30);
            b = a;
            a = t;
        }

        a = safe_add(a, olda);
        b = safe_add(b, oldb);
        c = safe_add(c, oldc);
        d = safe_add(d, oldd);
        e = safe_add(e, olde);
    }
    return Array(a, b, c, d, e);

}

function sha1_ft(t, b, c, d) {
    if (t < 20) return (b & c) | ((~b) & d);
    if (t < 40) return b ^ c ^ d;
    if (t < 60) return (b & c) | (b & d) | (c & d);
    return b ^ c ^ d;
}

function sha1_kt(t) {
    return (t < 20) ? 1518500249 : (t < 40) ? 1859775393 : (t < 60) ? -1894007588 : -899497514;
}

function safe_add(x, y) {
    var lsw = (x & 0xFFFF) + (y & 0xFFFF);
    var msw = (x >> 16) + (y >> 16) + (lsw >> 16);
    return (msw << 16) | (lsw & 0xFFFF);
}

function rol(num, cnt) {
    return (num << cnt) | (num >>> (32 - cnt));
}

function str2binb(str) {
    var bin = Array();
    var mask = (1 << chrsz) - 1;
    for (var i = 0; i < str.length * chrsz; i += chrsz)
        bin[i >> 5] |= (str.charCodeAt(i / chrsz) & mask) << (24 - i % 32);
    return bin;
}

function binb2hex(binarray) {
    var hex_tab = hexcase ? "0123456789ABCDEF" : "0123456789abcdef";
    var str = "";
    for (var i = 0; i < binarray.length * 4; i++) {
        str += hex_tab.charAt((binarray[i >> 2] >> ((3 - i % 4) * 8 + 4)) & 0xF) + hex_tab.charAt((binarray[i >> 2] >> ((3 - i % 4) * 8)) & 0xF);
    }
    return str;
}
//sha1加密-end
function getRandomCode() { //字典表
    var str = [
        'A', 'B', 'C', 'D', 'E', 'F', 'G', 'H', 'I', 'J', 'K', 'L', 'M', 'N', 'O', 'P', 'Q', 'R', 'S', 'T', 'U', 'V', 'W', 'X', 'Y', 'Z',
        'a', 'b', 'c', 'd', 'e', 'f', 'g', 'h', 'i', 'j', 'k', 'l', 'm', 'n', 'o', 'p', 'q', 'r', 's', 't', 'u', 'v', 'w', 'x', 'y', 'z',
        '0', '1', '2', '3', '4', '5', '6', '7', '8', '9'
    ];
    return str[Math.round(Math.random() * 61)];
}
function randomCode() {
    var nonceStr_str = '';
    for (var i = 0; i < 16; i++) {
        var str = getRandomCode();
        nonceStr_str += str; //遍历16次，生成16位随机码
    }
    return nonceStr_str;
}
export default {
    install(Vue, options) {
        Vue.prototype.we_config = function () { //配置调用
            var appId_str = 'wx1e26b1652eed13a3'; //appid
            if (window.navigator.userAgent.toLowerCase().match(/MicroMessenger/i) == 'micromessenger') { //微信设备环境，access_token仅保存2小时
                Api.authUserOpenId().then((response) => {
                    var nonceStr_str = randomCode(); //获取一次随机码
                    var timestamp_str = parseInt(Date.now() / 1000);
                    var signStr = "jsapi_ticket=" + response.data.jsapi_ticket + "&noncestr=" + nonceStr_str + "&timestamp=" + timestamp_str + "&url=" + window.location.href.split('#')[0];
                    var sign_str = hex_sha1(signStr);
                    wx.config({
                        debug: false,
                        appId: appId_str, // 和获取Ticke的必须一样------必填，公众号的唯一标识
                        timestamp: String(timestamp_str), // 必填，生成签名的时间戳
                        nonceStr: nonceStr_str, // 必填，生成签名的随机串
                        signature: sign_str, // 必填，签名，见附录1
                        jsApiList: [ //需要分享的列表项:发送给朋友，分享到朋友圈，分享到QQ，分享到QQ空间
                            'onMenuShareAppMessage',
                            'onMenuShareTimeline',
                        ]
                    });
                    var data = JSON.parse(localStorage.getItem('share_data'));
                    wx.ready(() => {
                        wx.checkJsApi({
                            jsApiList: ['onMenuShareAppMessage', 'onMenuShareTimeline'], // 需要检测的JS接口列表，所有JS接口列表见附录2,
                            success: function (res) {
                                Api.sendError(res).then((response) => { })
                                wx.onMenuShareAppMessage({  //分享给朋友
                                    title: data.share_title,
                                    desc: data.share_remark,
                                    link: window.location.href.split('#')[0],
                                    imgUrl: 'http://zsnice.oss-cn-shenzhen.aliyuncs.com/zsnice-icon.png',
                                });
                                wx.onMenuShareTimeline({  //分享到朋友圈
                                    title: data.share_title,
                                    desc: data.share_remark,
                                    link: window.location.href.split('#')[0],
                                    imgUrl: 'http://zsnice.oss-cn-shenzhen.aliyuncs.com/zsnice-icon.png',
                                });
                            },
                            error: function (err) {
                                err.title = data.share_title;
                                err.desc = data.share_remark;
                                err.link = window.location.href.split('#')[0];
                                err.jsapi_ticket = response.data.jsapi_ticket;
                                err.timestamp = String(timestamp_str);
                                err.nonceStr = nonceStr_str;
                                err.signature = sign_str;
                                Api.sendError(err).then((response) => { })
                            }
                        });
                        wx.error((err) => {
                            err.title = data.share_title;
                            err.desc = data.share_remark;
                            err.link = window.location.href.split('#')[0];
                            err.jsapi_ticket = response.data.jsapi_ticket;
                            err.timestamp = String(timestamp_str);
                            err.nonceStr = nonceStr_str;
                            err.signature = sign_str;
                            Api.sendError(err).then((response) => {
                            })
                        });
                    })
                    return;
                }).catch((err) => {
                    return console.log('getOpenIdError:', err);
                })
            } else { //非微信设备
                return console.log('not_weixin!');
            }
        }
    }
}