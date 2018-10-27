'use strict';

const { app, assert } = require('egg-mock/bootstrap');

describe('test/app/controller/users.test.js', () => {
  let initalSize;
  let username = `zfpx${Date.now()}`;
  let newId;
  let newUser = {
    username,
    password: username,
    email: `${username}.qq.com`,
    phone: username
  }

  it('查看用户列表', async () => {
    let result = await app.httpRequest().get('/users').expect(200);
    let users = result.body;
    assert(Array.isArray(users));
    initalSize = users.length;
  });

  it('增加用户', async () => {
    //result  = {code:0,data:6};
    let result = await app.httpRequest()
      .post('/users')
      .set('Content-Type', "application/json")
      .set('Accept', 'application/json')
      .send(JSON.stringify(newUser))
      .expect(200);
    let response = result.body;
    newId = response.data;
    newUser.id = newId;
    assert(!isNaN(newId));
  });

  it('查看某个用户', async () => {
    let result = await app.httpRequest().get(`/users/${newId}`).expect(200);
    let user = result.body;
    assert(user.username == newUser.username);
    assert(user.password == newUser.password);
    assert(user.email == newUser.email);
    assert(user.phone == newUser.phone);
  });
  it('更新某个用户', async () => {
    newUser.username = '更新后的用户名';
    let result = await app.httpRequest()
      .put(`/users/${newId}`)
      .set('Content-Type', "application/json")
      .set('Accept', 'application/json')
      .send(JSON.stringify(newUser))
      .expect(200);
    let user = result.body;
    assert(user.username == newUser.username);
  });
  it('删除某个用户', async () => {
    let result = await app.httpRequest().delete(`/users/${newId}`).expect(200);
    let ret = result.body.data;
    assert(ret == '删除成功');
  });
});
