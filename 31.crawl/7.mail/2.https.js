let querystring = require('querystring');
let url = 'https://mp.weixin.qq.com/mp/profile_ext?action=getmsg&__biz=MzUxMzAyMTQ0MQ==&f=json&count=10&uin=777&key=777&pass_ticket=E1QfR0w1POG7hxwNfaHOI%2FFtIkG%2Fsfc%2B5A4n1mE44kuWX3ZY2f7HtnLr2x0%2FMXaZ&wxtoken=&appmsg_token=970_m4eTatdENOLWNjb%252F3gKctn_2K5QmAyR1-EBIRw~~&x5=1&f=json';
let headerString = `
Host: mp.weixin.qq.com
Connection: keep-alive
X-Requested-With: XMLHttpRequest
User-Agent: Mozilla/5.0 (Linux; Android 8.1; MI 6X Build/OPM1.171019.011; wv) AppleWebKit/537.36 (KHTML, like Gecko) Version/4.0 Chrome/57.0.2987.132 MQQBrowser/6.2 TBS/044204 Mobile Safari/537.36 MicroMessenger/6.7.1321(0x26070030) NetType/WIFI Language/zh_CN
Accept: */*
Referer: https://mp.weixin.qq.com/mp/profile_ext?action=home&__biz=MzUxMzAyMTQ0MQ==&devicetype=android-27&version=26070030&lang=zh_CN&nettype=WIFI&a8scene=7&session_us=gh_09222fa56aa9&pass_ticket=E1QfR0w1POG7hxwNfaHOI%2FFtIkG%2Fsfc%2B5A4n1mE44kuWX3ZY2f7HtnLr2x0%2FMXaZ&wx_header=1
Accept-Language: zh-CN,en-US;q=0.8
Cookie: rewardsn=; wxtokenkey=777; wxuin=3784932840; devicetype=android-27; version=26070030; lang=zh_CN; pass_ticket=E1QfR0w1POG7hxwNfaHOI/FtIkG/sfc+5A4n1mE44kuWX3ZY2f7HtnLr2x0/MXaZ; wap_sid2=COj75YwOElxhRVlCRWpsRHpsUVh4Rnc2cThPOWloTGpNMFJJRzl5RnVjanNUYjRjVmlobm5aN1B1VFBPQVdfWkZPMU55YWI5VE5aN0ExWkh0N0pQYjNFNWFWSzVHc29EQUFBfjCGpt/bBTgNQJVO
Q-UA2: QV=3&PL=ADR&PR=WX&PP=com.tencent.mm&PPVN=6.7.0&TBSVC=43610&CO=BK&COVC=044204&PB=GE&VE=GA&DE=PHONE&CHID=0&LCID=9422&MO= MI6X &RL=1080*2030&OS=8.1.0&API=27
Q-GUID: 5d00938fb27769f4f56a059313b788cb
Q-Auth: 31045b957cf33acf31e40be2f3e71c5217597676a9729f1b
`;
let headers = querystring.parse(headerString, '\n', ': ');
let request = require('request');
let options = {
    url,
    headers
}

request(options, function (err, response, body) {

    let result = JSON.parse(body);
    //console.log(result);
    let general_msg_list = result.general_msg_list;
    let ret = JSON.parse(general_msg_list);
    let newArray = ret.list.map(item => {
        return item.app_msg_ext_info.title;
    });
    console.log(newArray);
});