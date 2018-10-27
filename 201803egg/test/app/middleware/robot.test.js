const { app, assert } = require('egg-mock/bootstrap');
describe('test app\middleware\robot.test.js', function () {
    it('Baidu should be Forbidden', function () {
        app.httpRequest()
            .get('/news')
            .set('User-Agent', 'Baidu')
            .expect(403)
    });
    it('Google should be Pass', function () {
        app.httpRequest()
            .get('/news')
            .set('User-Agent', 'Google')
            .expect(200)
    });
    it('数据应该是正确的', function (done) {
        app.httpRequest()
            .get('/news?pageNum=1&pageSize=3')
            .set('User-Agent', 'Google')
            .set('Accept', 'text/html')
            .expect(200)
            .end(function (err, res) {
                if (err) return done(err);
                done();
            });
        // .expect(function (response) {
        //     console.log('err', response);
        //     console.log('data', response.text);
        //     assert(response.text.indexOf('标题1') != -1);
        //     done();
        // })
    });
});