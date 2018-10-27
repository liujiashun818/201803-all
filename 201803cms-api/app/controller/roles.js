const BaseController = require('./base');

class Controller extends BaseController {
  constructor(...args) {
    super(...args);
    this.model = 'roles';
  }
  async index() {
    const { app, ctx } = this;
    let { current, pageSize, ...where } = ctx.query;
    current = isNaN(current) ? 1 : Number(current);
    pageSize = isNaN(pageSize) ? 3 : Number(pageSize);
    let wheres = [];
    for (let key in where) {
      wheres.push(`${key} like "%${where[key]}%"`);
    }
    let whereSQL = '';
    if (wheres.length > 0) {
      whereSQL = 'WHERE ' + wheres.join(' AND ');
    }
    let sql = `SELECT * FROM ${this.model}  ${whereSQL}  limit ${(current - 1) * pageSize},${pageSize}`;
    const list = await app.mysql.query(sql);
    for (let i = 0; i < list.length; i++) {
      // [{resource_id:2}]
      let resourceIds = await app.mysql.query(`SELECT resource_id FROM role_resource WHERE role_id = ?`, [list[i].id]);
      resourceIds = resourceIds.map(item => item.resource_id);
      list[i].resourceIds = resourceIds;// [1,2,3]

      let userIds = await app.mysql.query(`SELECT user_id FROM user_role WHERE role_id = ?`, [list[i].id]);
      userIds = userIds.map(item => item.user_id);
      list[i].userIds = userIds;// [1,2,3]
    }
    let countSQL = `SELECT COUNT(*) AS total from ${this.model} ${whereSQL} `;
    const totalResult = await app.mysql.query(countSQL);
    const total = totalResult[0].total;
    this.success({ total, list });
  }
  async getResources() {
    let resources = await this.app.mysql.select('resources');
    let topMenus = [];//这里放着所有的顶级菜单
    let resourceMap = {};//这里放置对应关系 key就是资源 的ID，值就是资源 的对象
    resources = resources.filter(item => {
      item.children = [];//每个对象都一个空的children数组
      resourceMap[item.id] = item;//只是把ID和这个ID对应的对象进行了关联
      if (item.parent_id == 0) {//如果父ID为0的话那就是顶级或者说一级菜单
        topMenus.push(item);//如果是顶级菜单则放在topMenus里
      } else {  //如果不是顶级菜单的话
        return true;//经过过滤后resources数组中只剩下非顶级菜单
      }
    });
    resources.forEach(item => {
      resourceMap[item.parent_id].children.push(item);
    });
    this.success(topMenus);
  }
  async getUsers() {
    let users = await this.app.mysql.select('users');
    this.success(users);
  }

  async setResources() {
    //新的角色的ID，和新的资源ID的数组
    let { roleId, resourceIds } = this.ctx.request.body;
    await this.app.mysql.query(`DELETE FROM role_resource WHERE role_id = ?`, [roleId]);
    for (let i = 0; i < resourceIds.length; i++) {
      await this.app.mysql.insert('role_resource', { role_id: roleId, resource_id: resourceIds[i] });
    }
    this.success('权限设置成功');
  }

  async setUsers() {
    //新的角色的ID，和新的用户ID的数组
    let { roleId, userIds } = this.ctx.request.body;
    await this.app.mysql.query(`DELETE FROM user_role WHERE role_id = ?`, [roleId]);
    for (let i = 0; i < userIds.length; i++) {
      await this.app.mysql.insert('user_role', { role_id: roleId, user_id: userIds[i] });
    }
    this.success('用户设置成功');
  }
}

module.exports = Controller;
