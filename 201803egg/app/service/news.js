const { Service } = require('egg');
class NewsService extends Service {
    async list(data) {
        let { app, ctx } = this;
        // {headers,data}
        //http://localhost:8000/list?pageNum=2&pageSize=3
        let ret = await ctx.curl('http://localhost:8000/list', {
            method: 'GET',
            data,
            dataType: 'json'
        });
        let promises = ret.data.map(id => ctx.curl(`http://localhost:8000/item/${id}`, {
            dataType: 'json'
        }));
        //curl返回一个promise,这个promise的resolve结果是一个response对象 {headers,data} data才是响应体
        let list = await Promise.all(promises);
        list = list.map(item => {
            let data = item.data;
            // data.createAt = ctx.helper.format(data.createAt);
            return data;
        });
        return list;//[{id:1,title:'标题1'}]
    }
}
module.exports = NewsService;