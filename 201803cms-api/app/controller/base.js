const { Controller } = require('egg');

class BaseController extends Controller {
  constructor(...args) {
    super(...args);
  }
  success(data) {
    this.ctx.body = {
      code: 0,
      data
    }
  }
  error(error) {
    this.ctx.body = {
      code: 1,
      error
    }
  }
  async index() {
    const { app, ctx } = this;
    let { current, pageSize, ...where } = ctx.query;
    current = isNaN(current) ? 1 : Number(current);
    pageSize = isNaN(pageSize) ? 3 : Number(pageSize);
    let wheres = [];
    for (let key in where) {// {username:'1',phone:"2",email:"3"}
      wheres.push(`${key} like "%${where[key]}%"`);// [username like '%1%',phone like '%2%']
    }
    let whereSQL = '';
    if (wheres.length > 0) {
      whereSQL = 'WHERE ' + wheres.join(' AND ');
    }
    // username LIKE '%1%' AND phone LIKE '%2%' AND email LIKE '%3%'
    let sql = `SELECT * FROM ${this.model}  ${whereSQL}  limit ${(current - 1) * pageSize},${pageSize}`;
    const list = await app.mysql.query(sql);
    // const list = await app.mysql.select(this.model, {
    //   offset: (current - 1) * pageSize,
    //   limit: pageSize,
    //   where //通过where可以指定查询的条件
    // });
    //const total = await app.mysql.count(this.model, where);
    let countSQL = `SELECT COUNT(*) AS total from ${this.model} ${whereSQL} `;
    const totalResult = await app.mysql.query(countSQL);
    const total = totalResult[0].total;
    //返回总条数和当前页的数据数组
    this.success({ total, list });
  }
  async create() {
    const { app, ctx } = this;
    const body = ctx.request.body;
    if (body.username == 'admin') {
      return this.error('用户名不能是admin');
    }
    const { insertId } = await app.mysql.insert(this.model, body);
    this.success(insertId);
  }
  async show() {
    const { app, ctx } = this;
    const id = ctx.params.id;
    const entity = await app.mysql.get(this.model, { id });
    this.success(entity);
  }
  async update() {
    const { app, ctx } = this;
    const body = ctx.request.body;
    const result = await app.mysql.update(this.model, body);
    const entity = await app.mysql.get(this.model, { id: body.id });
    this.success(entity);
  }
  async destroy() {
    const { app, ctx } = this;
    const id = ctx.params.id;
    const ids = ctx.request.body;
    if (!ids) {//如果没有请求体，那就是单选，
      ids = [id];
    }
    // DELETE FROM users WHERE id = ?
    // DELETE FROM users WHERE id in (1,2)
    const result = await app.mysql.delete(this.model, { id: ids });
    this.success('删除成功');
  }
}

module.exports = BaseController;
