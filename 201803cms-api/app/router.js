
/**
 * 实现用户表 角色表 资源表 用户角色表 角色资源表 的API接口
 */
module.exports = app => {
  const { router, controller } = app;
  const auth = app.middleware.auth({}, app);
  router.get('/roles/getResources', controller.roles.getResources);
  router.get('/roles/getUsers', controller.roles.getUsers);
  router.post('/roles/setResources', controller.roles.setResources);
  router.post('/roles/setUsers', controller.roles.setUsers);
  app.resources('users', '/users', auth, controller.users);
  app.resources('roles', '/roles', auth, controller.roles);
  app.resources('resources', '/resources', auth, controller.resources);
  app.resources('userRole', '/userRole', auth, controller.userRole);
  app.resources('roleResource', '/roleResource', auth, controller.roleResource);
  router.post('/login', controller.users.login);
  router.post('/signup', controller.users.signup);
  router.get('/captcha', controller.users.captcha);
  router.post('/upload/:uid', controller.users.upload);
};
