let CronJob = require('cron').CronJob;
//1参数是执行的时机 2参数是回调函数
/**
 * *    *    *    *     *    * 
 * 秒  分钟  小时  日   月    星期  
 * 1. 特定值
 * 2. 多个枚举值
 * 3. 区间
 * 4. 每隔多少
 * 5. * 所有的可能的值
 * 每个月的5号执行一次 0 0 0 5 * *
 * 每周二和每周五执行
 */
let job = new CronJob('0 0 0 0 0 2,5', () => {
    console.log(new Date().toLocaleString());
});
job.start();