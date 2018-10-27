(function (modules) { // webpack的启动函数
  //模块的缓存
  var installedModules = {};

  // webpac自己实现的在浏览器可以使用的require方法，类似于 node require
  function __webpack_require__(moduleId) {

    //检查此模块是否在缓存里，如果在的话，直接返回
    if (installedModules[moduleId]) {
      return installedModules[moduleId].exports;
    }
    //如果不在缓存里，则创建一个新的模块并且放到缓存里
    var module = installedModules[moduleId] = {
      i: moduleId,// id 模块ID
      l: false,// loaded 是否否加载或者说初始化完成
      exports: {}//此模块的导出对象
    };

    // Execute the module function
    //执行模块函数,并且传入参数  this指向模块的导出对象 module模块对象 module.exports导出对象 require方法
    modules[moduleId].call(module.exports, module, module.exports, __webpack_require__);

    // 把加载完成标题设置为true
    module.l = true;

    //返回模块的导出对象
    return module.exports;
  }


  //把modules对象赋给require.m属性
  __webpack_require__.m = modules;

  // 把installedModules对象赋给require.c属性
  __webpack_require__.c = installedModules;

  // define getter function for harmony exports
  __webpack_require__.d = function (exports, name, getter) {
    if (!__webpack_require__.o(exports, name)) {
      Object.defineProperty(exports, name, { enumerable: true, get: getter });
    }
  };

  //在exports 对象上定义__esModule属性
  __webpack_require__.r = function (exports) {
    if (typeof Symbol !== 'undefined' && Symbol.toStringTag) {
      //exports[Symbol.toStringTag] = 'Module';
      Object.defineProperty(exports, Symbol.toStringTag, { value: 'Module' });
    }
    Object.defineProperty(exports, '__esModule', { value: true });
    //exports.__esModule= true;
  };

  // create a fake namespace object
  // mode & 1: value is a module id, require it
  // mode & 2: merge all properties of value into the ns
  // mode & 4: return value when already ns object
  // mode & 8|1: behave like require
  __webpack_require__.t = function (value, mode) {
    if (mode & 1) value = __webpack_require__(value);
    if (mode & 8) return value;
    if ((mode & 4) && typeof value === 'object' && value && value.__esModule) return value;
    var ns = Object.create(null);
    __webpack_require__.r(ns);
    Object.defineProperty(ns, 'default', { enumerable: true, value: value });
    if (mode & 2 && typeof value != 'string') for (var key in value) __webpack_require__.d(ns, key, function (key) { return value[key]; }.bind(null, key));
    return ns;
  };

  // getDefaultExport function for compatibility with non-harmony modules
  __webpack_require__.n = function (module) {
    var getter = module && module.__esModule ?
      function getDefault() { return module['default']; } :
      function getModuleExports() { return module; };
    __webpack_require__.d(getter, 'a', getter);
    return getter;
  };

  // Object.prototype.hasOwnProperty.call
  __webpack_require__.o = function (object, property) { return Object.prototype.hasOwnProperty.call(object, property); };

  // 存放着publicPath参数的值
  __webpack_require__.p = "";


  //加载入口模块并且返回导出对象
  return __webpack_require__(__webpack_require__.s = "./src/index.js");
})
  ({

    "./src/index.js":
      (function (module, __webpack_exports__, __webpack_require__) {
        eval("__webpack_require__.r(__webpack_exports__);\n/* harmony import */ var _name__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./name */ \"./src/name.js\");\n\r\nalert(_name__WEBPACK_IMPORTED_MODULE_0__[\"default\"]);\n\n//# sourceURL=webpack:///./src/index.js?");
      }),

    "./src/name.js":
      (function (module, __webpack_exports__, __webpack_require__) {

        eval("__webpack_require__.r(__webpack_exports__);\n/* harmony default export */ __webpack_exports__[\"default\"] = (name = 'zfpx');\n\n//# sourceURL=webpack:///./src/name.js?");
      })

  });