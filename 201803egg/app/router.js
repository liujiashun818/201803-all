//router = new Router()
module.exports = app => {
    //router 路由容器 controller 控制器对象
    //controller={} controller.news = new NewsController()
    let { router, controller } = app;
    //当客户端通过GET方式 访问/news路径的时候，会由controller.news.index方法来处理请求
    router.get('/news', controller.news.index);
}