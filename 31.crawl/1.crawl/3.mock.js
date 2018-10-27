const puppeteer = require('puppeteer');
(async function () {
    //启动一个浏览器
    let browser = await puppeteer.launch({ headless: false });
    //打开一个页面
    let page = await browser.newPage();
    //在这个页面里跳转到新的路径
    await page.goto('http://www.baidu.com');
    await page.screenshot({ path: 'baidu.jpg' });
    browser.close();
})()