let { Controller } = require('egg');
class NewsController extends Controller {
    //service={} service.news=new NewsService()
    async index() {
        let { app, ctx, service } = this;
        let query = ctx.query;//{pageNum:1,pageSize:3}
        let list = await service.news.list(query);
        await ctx.render('news.ejs', { title: '新闻列表', list });
    }
}
module.exports = NewsController;