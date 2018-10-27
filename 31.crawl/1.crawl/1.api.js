let request = require('request');
const zlib = require('zlib');
let options = {
    url: 'https://lccro-api-ms.juejin.im/v1/get_multi_user?uid=&device_id=&token=&src=web&ids=5928e14644d90400641dec8a&cols=viewedEntriesCount%7Crole%7CtotalCollectionsCount%7CallowNotification%7CsubscribedTagsCount%7CappliedEditorAt%7Cemail%7CfollowersCount%7CpostedEntriesCount%7ClatestCollectionUserNotification%7CcommentedEntriesCount%7CweeklyEmail%7CcollectedEntriesCount%7CpostedPostsCount%7Cusername%7ClatestLoginedInAt%7CtotalHotIndex%7CblogAddress%7CselfDescription%7ClatestCheckedNotificationAt%7CemailVerified%7CtotalCommentsCount%7Cinstallation%7Cblacklist%7CweiboId%7CmobilePhoneNumber%7Capply%7CfolloweesCount%7CdeviceType%7CeditorType%7CjobTitle%7Ccompany%7ClatestVoteLikeUserNotification%7CauthData%7CavatarLarge%7CmobilePhoneVerified%7CobjectId%7CcreatedAt%7CupdatedAt',
    //json: true,
    encoding: null,//默认情况下，request会把响应体转成utf8字符串
    headers: {
        "Host": "lccro-api-ms.juejin.im",
        "Connection": "keep-alive",
        "Origin": "https://juejin.im",
        "User-Agent": "Mozilla/5.0 (Windows NT 6.1; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/68.0.3440.106 Safari/537.36",
        "Accept": "*/*",
        "Referer": "https://juejin.im/post/599ececb5188252423583c27",
        //"Accept-Encoding": " gzip, deflate, br",
        "Accept-Language": "zh-CN,zh;q=0.9",
    }
}
request(options, (err, response, body) => {
    zlib.gunzip(body, (err, data) => {
        let str = data.toString();
        let userInfos = JSON.parse(str);
        console.log('totalViewsCount', userInfos.d['5928e14644d90400641dec8a'].totalViewsCount);
    })
    //console.log(body);
    //let ret = JSON.parse(body);
    // console.log(ret);
    //console.log('ret.d', ret.d);
    //console.log('ret.d["5928e14644d90400641dec8a"]', ret.d['5928e14644d90400641dec8a']);
    // console.log('totalViewsCount', body.d['5928e14644d90400641dec8a'].totalViewsCount);
});