(function (modules) { // webpack的启动函数
  // The module cache 模块的缓存
  var installedModules = {};

  // The require function webpack自己实现的在浏览器里能够执行的require方法
  function __webpack_require__(moduleId) {

    // Check if module is in cache 看看此模块是否在缓存中
    if (installedModules[moduleId]) {
      //如果缓存有的话，则取它缓存的模块的对象的exports属性并返回
      return installedModules[moduleId].exports;

    }
    // Create a new module (and put it into the cache)
    //创建一个新的模块，并且放置到缓存
    var module = installedModules[moduleId] = {
      i: moduleId,//i=identify模块的标识符，模块的ID
      l: false,//l= loaded 是否已经加载完成
      exports: {} //此模块导出对象
    };

    // Execute the module function 执行模块函数,传入参数 
    //1 module.exports=this 2.module 模块对象  3.module.exports 模块的导出对象 4.require方法
    modules[moduleId].call(module.exports, module, module.exports, __webpack_require__);

    // Flag the module as loaded 把模块标识 为已加载 loaded=true
    module.l = true;

    // Return the exports of the module 返回模块的导出对象
    return module.exports;

  }


  // expose the modules object (__webpack_modules__) 把modules挂载到require的m属性
  __webpack_require__.m = modules;

  // expose the module cache把模块的缓存挂载到require的c属性上 
  __webpack_require__.c = installedModules;

  // define getter function for harmony exports
  //定义一个getter方法 1导出对象 2名称 3 getter
  __webpack_require__.d = function (exports, name, getter) {
    if (!__webpack_require__.o(exports, name)) {
      //给exports对象定义name属性，值是可枚举的，get
      Object.defineProperty(exports, name, { enumerable: true, get: getter });
      //   exports[name]
    }
  };

  // define __esModule on exports 在导出对象上定义__esModule属性
  //如果此exports对象__esModule属性为true的话，表示这是一个es6的模块
  __webpack_require__.r = function (exports) {
    if (typeof Symbol !== 'undefined' && Symbol.toStringTag) {
      //如果是支持es6的Symbol属性的话，那么定义属性 exports[Symbol.toStringTag] ='Module'
      Object.defineProperty(exports, Symbol.toStringTag, { value: 'Module' });
    }
    // exports['__esModule'] = true;
    Object.defineProperty(exports, '__esModule', { value: true });

  };

  // getDefaultExport function for compatibility with non-harmony modules
  // 获取默认导出函数为了兼容性 参数就是module对象
  __webpack_require__.n = function (module) {//hello
    //先拿到一个getter
    var getter = module && module.__esModule ?
      function getDefault() { return module['default']; } :
      function getModuleExports() { return module; };
    //var getter =    function() { return 'hello'; };
    __webpack_require__.d(getter, 'a', getter);
    // get a(){return 'a'}   obj['a']
    // getter['a'] = getter;
    //(function() { return 'hello'; })['a'] =  (function() { return 'hello'; })
    return getter;

  };

  // Object.prototype.hasOwnProperty.call
  //判断对象有没有某个属性
  __webpack_require__.o = function (object, property) {
    return Object.prototype.hasOwnProperty.call(object, property);
  };

  // __webpack_public_path__ webpack的公开路径  webpack publicPath
  __webpack_require__.p = "";


  // Load entry module and return exports
  // 加载入口模块并且返回导出对象 s就是入口标识符
  return __webpack_require__(__webpack_require__.s = "./src/main.js");
})
  //modules是一个对象，有属性和值，属性就是此模块的ID，其实就是相对于根目录的相对路径
  ({
    "./src/base.js":
      (function (module, exports) {
        eval("module.exports = 'hello';\n\n//# sourceURL=webpack:///./src/base.js?");
      }),
    "./src/main.js":
      (function (module, exports, __webpack_require__) {
        eval("let name = __webpack_require__(/*! ./base */ \"./src/base.js\");\r\nconsole.log(name);\r\n\n\n//# sourceURL=webpack:///./src/main.js?");
      })
  });