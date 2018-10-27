'use strict';

const Controller = require('egg').Controller;

class HomeController extends Controller {
  async index() {
    const createRule = {
      name: { type: 'string', required: true },
    };
    this.ctx.validate(createRule,ctx.request.body);

    this.ctx.body = 'hi, egg';
  }
}

module.exports = HomeController;
