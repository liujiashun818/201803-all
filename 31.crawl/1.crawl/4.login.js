const puppeteer = require('puppeteer');
const path = require('path');
const request = require('request');
let fs = require('fs');
var showapiSdk = require('showapi-sdk');
let email = '1516383135@qq.com';
let password = 'zfpx2018';
(async function () {
    //启动一个浏览器
    let browser = await puppeteer.launch({ headless: false });
    //打开一个页面
    let page = await browser.newPage();
    //在这个页面里跳转到新的路径
    await page.goto('https://accounts.douban.com/login');
    await page.screenshot({ path: 'login.jpg' });
    await page.type('#email', email, { delay: 10 });
    await page.screenshot({ path: 'email.jpg' });
    await page.type('#password', password, { delay: 10 });
    await page.screenshot({ path: 'password.jpg' });
    const url = await page.$eval('#captcha_image', el => el.getAttribute('src'));
    console.log('url', url);
    const captchaText = await getCaptcha(url);
    await page.type('#captcha_field', captchaText);
    await page.screenshot({ path: 'captchaText.jpg' });
    await page.click('.btn-submit');
    await page.waitForNavigation({
        networkidle2: true
    });
    await page.screenshot({ path: 'welcome.jpg' });
    await browser.close();
})()

function getCaptcha(url) {
    return new Promise(function (resolve, reject) {
        let options = {
            url,
            headers: {
                "User-Agent": "Mozilla/5.0 (Windows NT 6.1; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/68.0.3440.106 Safari/537.36"
            }
        }
        let captchaStream = request(options);
        //设置你测试用的appId和secret,img
        var appId = '72885';
        var secret = 'ae08b393b8fa4a1290ab3f700d2c3f95';
        //开启debug
        //showapiSdk.debug(true);
        if (!(appId && secret)) {
            console.error('请先设置appId等测试参数,详见样例代码内注释!')
            return;
        }
        //全局默认设置
        showapiSdk.setting({
            url: "http://route.showapi.com/184-4",//你要调用的API对应接入点的地址,注意需要先订购了相关套餐才能调
            appId: appId,//你的应用id
            secret: secret,//你的密钥
            timeout: 5000,//http超时设置
            options: {//默认请求参数,极少用到
                testParam: 'test'
            }
        })

        var apiRequest = showapiSdk.request();
        apiRequest.appendText('typeId', '20');
        apiRequest.appendText('convert_to_jpg', '0');
        apiRequest.appendText('needMorePrecise', '0');
        apiRequest.appendFile('image', {
            value: captchaStream,
            options: {
                filename: 'captcha.jpg',
                contentType: 'image/jpeg'
            }
        });
        apiRequest.post(function (data) {
            console.info(data);
            resolve(data.showapi_res_body.Result);
        })
    });
}