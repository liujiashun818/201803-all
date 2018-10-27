let querystring = require('querystring');
let url = 'https://mp.weixin.qq.com/mp/getappmsgext?f=json&mock=&uin=777&key=777&pass_ticket=E1QfR0w1POG7hxwNfaHOI%25252FFtIkG%25252Fsfc%25252B5A4n1mE44kuWX3ZY2f7HtnLr2x0%25252FMXaZ&wxtoken=777&devicetype=android-27&clientversion=26070030&appmsg_token=970_dJg4U7n3dXP7fGxZhhGd7uLnptF25IeGJmAKj--Uwxfm2zyF5yE4qvwn_J3H_oqf29UtWaXdrSVbOXw1&x5=1&f=json';
let headerString = `
Host: mp.weixin.qq.com
Connection: keep-alive
Content-Length: 918
Origin: https://mp.weixin.qq.com
X-Requested-With: XMLHttpRequest
User-Agent: Mozilla/5.0 (Linux; Android 8.1; MI 6X Build/OPM1.171019.011; wv) AppleWebKit/537.36 (KHTML, like Gecko) Version/4.0 Chrome/57.0.2987.132 MQQBrowser/6.2 TBS/044204 Mobile Safari/537.36 MicroMessenger/6.7.1321(0x26070030) NetType/WIFI Language/zh_CN
Content-Type: application/x-www-form-urlencoded; charset=UTF-8
Accept: */*
Referer: https://mp.weixin.qq.com/s?__biz=MzUxMzAyMTQ0MQ==&mid=2247486276&idx=1&sn=f8e959354b46e22e4907ddaef8a21335&chksm=f95ac82ace2d413cdceee34f5aaeb8a80e2113fb1637cc322e262c988f9ac1e5c863d530cab6&scene=27&ascene=0&devicetype=android-27&version=26070030&nettype=WIFI&abtest_cookie=AgABAAoACwACACWXHgA7mR4AAAA%3D&lang=zh_CN&pass_ticket=E1QfR0w1POG7hxwNfaHOI%2FFtIkG%2Fsfc%2B5A4n1mE44kuWX3ZY2f7HtnLr2x0%2FMXaZ&wx_header=1
Accept-Language: zh-CN,en-US;q=0.8
Cookie: rewardsn=; wxtokenkey=777; wxuin=3784932840; devicetype=android-27; version=26070030; lang=zh_CN; pass_ticket=E1QfR0w1POG7hxwNfaHOI/FtIkG/sfc+5A4n1mE44kuWX3ZY2f7HtnLr2x0/MXaZ; wap_sid2=COj75YwOElxZSmVuYXB5ZTlscnh0QnZSVmpPTXEySVVXV1BsLXR4ZlJjZVd6RklQRE1qOVBLUEQ3N3lra2NkbHdrYzV6Y2s0RTVsTkQ0Q0RjaHZsZVhTU0VkcUNhOG9EQUFBfjC4rN/bBTgNQAE=
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
    console.log(err);
    let result = JSON.parse(body);
    let read_num = result.appmsgstat.read_num;
    let like_num = result.appmsgstat.like_num;
    console.log(`阅读量 ${read_num},赞的数量${like_num}`);
});
/**
 * 	"appmsgstat": {
		"show": true,
		"is_login": true,
		"liked": false,
		"read_num": 1060,
		"like_num": 10,
		"ret": 0,
		"real_read_num": 0
	},
 */