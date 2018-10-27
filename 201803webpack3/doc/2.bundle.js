(function (modules) { // webpack的入口文件
  // install a JSONP callback for chunk loading
  //安装一个JSONP的回调为了加载chunk代码块
  function webpackJsonpCallback(data) {//data=[[0],additionalModules]
    var chunkIds = data[0];//第一个元素是chunkId的数组
    var moreModules = data[1];//这个chunk里包含的额外更多的模块
    // add "moreModules" to the modules object,
    //把这次取出来的更多的模块添加到modules对象中
    // then flag all "chunkIds" as loaded and fire callback
    //然后把所有的chunkIds标识为已回天，并且执行回调函数
    var moduleId, chunkId, i = 0, resolves = [];
    //循环本次取出来的chunkIds
    for (; i < chunkIds.length; i++) {
      chunkId = chunkIds[i];//先取出一个chunkId
      if (installedChunks[chunkId]) {//如果说有值的话
        //把这个installedChunks[chunkId]的0元素，promise resovle方法添加resolves数组中去
        resolves.push(installedChunks[chunkId][0]);
      }
      installedChunks[chunkId] = 0;//加载完成
    }
    //循环迭代新模块并且
    for (moduleId in moreModules) {
      //把新的模块对象的上的属性全部合并或者说拷贝到老的modules对象上
      if (Object.prototype.hasOwnProperty.call(moreModules, moduleId)) {
        modules[moduleId] = moreModules[moduleId];
      }
    }
    //如果parentJsonpFunction有值的话，调用它,经其实就是jsonArray.push方法
    if (parentJsonpFunction) parentJsonpFunction(data);
    //依次调用resolve方法，让每个promise都成功
    while (resolves.length) {
      resolves.shift()();
    }

  };


  // 模块的缓存
  var installedModules = {};

  // object to store loaded and loading chunks
  // undefined = chunk not loaded, null = chunk preloaded/prefetched
  // Promise = chunk loading, 0 = chunk loaded
  //这是一个对象，用来存放加载过的和加载中的代码
  //chunk=undefined 表示未加载
  // chunk=null 表示预加载或者预获取
  //chunk=promise 的话表示加载中
  //chunk=0 表示已加载或者说加载完成
  var installedChunks = {
    "main": 0
  };



  // script path function 用来生成脚本路径的函数
  function jsonpScriptSrc(chunkId) {
    //p = output publicPath 访问路径  ,默认就是/
    return __webpack_require__.p + "" + chunkId + ".bundle.js"
  }

  //require方法
  function __webpack_require__(moduleId) {

    // Check if module is in cache 检查模块是否在缓存
    if (installedModules[moduleId]) {
      return installedModules[moduleId].exports;
    }
    // Create a new module (and put it into the cache) 创建一个新模块并且放到缓存中
    var module = installedModules[moduleId] = {
      i: moduleId,
      l: false,
      exports: {}
    };

    // Execute the module function 执行模块函数，给module.exports赋值
    modules[moduleId].call(module.exports, module, module.exports, __webpack_require__);

    // Flag the module as loaded 把模块设置为已加载 
    module.l = true;

    // Return the exports of the module 返回模块的导出对象
    return module.exports;
  }

  // This file contains only the entry chunk.
  // The chunk loading function for additional chunks
  //这个文件只包含入口chunk
  //这个代码块加载函数是为了加载额外的模块
  __webpack_require__.e = function requireEnsure(chunkId) {
    var promises = [];//创建一个空的promise数组

    // JSONP chunk loading for javascript
    // 先取出此chunkID对应的值 ,第一次的肯定是没有值
    var installedChunkData = installedChunks[chunkId];
    //不等0的话表示未安装，0表示已 安装或者说已加载
    if (installedChunkData !== 0) { // 0 means "already installed".

      // a Promise means "currently loading". 如果是一个promise表示正在加载
      if (installedChunkData) {//如果有值，把索引2对应的属性添加到promises数组中
        promises.push(installedChunkData[2]);
      } else {
        // setup Promise in chunk cache 在chunk缓存中创建一个promise
        var promise = new Promise(function (resolve, reject) {
          installedChunkData = installedChunks[chunkId] = [resolve, reject];
        });
        //把这个promise添加到promise数组中去
        promises.push(installedChunkData[2] = promise);

        // start chunk loading 开始代码块的加载
        var head = document.getElementsByTagName('head')[0];
        var script = document.createElement('script');//创建一个script脚本
        var onScriptComplete;//当脚本完成后

        script.charset = 'utf-8';//设置脚本的编码
        script.timeout = 120;//设置脚本的超时时间
        // if (__webpack_require__.nc) {//用来安全处理的 nonce
        //   script.setAttribute("nonce", __webpack_require__.nc);
        // }
        //拼出一个URL路径度且赋给script.src
        script.src = jsonpScriptSrc(chunkId);
        //定义加载后的回调函数
        onScriptComplete = function (event) {
          // avoid mem leaks in IE. 防止IE下面的内存泄露
          script.onerror = script.onload = null;
          //清除定时器.如果是提前执行此函数，则需要先清除定时器
          clearTimeout(timeout);
          //取得已安装的代码块中的chunk
          var chunk = installedChunks[chunkId];
          if (chunk !== 0) {//如果不等0表示加载失败
            if (chunk) {
              var errorType = event && (event.type === 'load' ? 'missing' : event.type);
              var realSrc = event && event.target && event.target.src;
              var error = new Error('Loading chunk ' + chunkId + ' failed.\n(' + errorType + ': ' + realSrc + ')');
              error.type = errorType;
              error.request = realSrc;
              chunk[1](error);//直接调用chunk[1],把error作为参数传进去，调用promise的reject方法，让promise失败
            }
            //把对应的值置为undefine
            installedChunks[chunkId] = undefined;
          }
        };
        //开启了一个定时器，如果说到了120秒之后请求还没有回来，我们就认为超时了，直接执行回调
        var timeout = setTimeout(function () {
          onScriptComplete({ type: 'timeout', target: script });
        }, 120000);
        script.onerror = script.onload = onScriptComplete;
        ///把JSONP脚本添加到head标签
        head.appendChild(script);
      }
    }
    return Promise.all(promises);
  };

  // expose the modules object (__webpack_modules__)
  __webpack_require__.m = modules;

  // expose the module cache
  __webpack_require__.c = installedModules;

  // define getter function for harmony exports
  __webpack_require__.d = function (exports, name, getter) {
    if (!__webpack_require__.o(exports, name)) {
      Object.defineProperty(exports, name, { enumerable: true, get: getter });
    }
  };

  // define __esModule on exports
  __webpack_require__.r = function (exports) {
    if (typeof Symbol !== 'undefined' && Symbol.toStringTag) {
      Object.defineProperty(exports, Symbol.toStringTag, { value: 'Module' });
    }
    Object.defineProperty(exports, '__esModule', { value: true });
  };

  // create a fake namespace object
  // mode & 1: value is a module id, require it
  // mode & 2: merge all properties of value into the ns
  // mode & 4: return value when already ns object
  // mode & 8|1: behave like require
  __webpack_require__.t = function (value, mode) {
    //如果说mode是1的话，则用require去加载这个模块
    if (mode & 1) value = __webpack_require__(value);
    //如果mode是8的话，则直接返回
    if (mode & 8) return value;
    //如果是mode是4的话 直接返回value
    if ((mode & 4) && typeof value === 'object' && value && value.__esModule) return value;
    var ns = Object.create(null);
    __webpack_require__.r(ns);//ns是一个es模块es.__esModule= true
    Object.defineProperty(ns, 'default', { enumerable: true, value: value });
    // ns['default'] = value;
    //如果mode值是2的话，把value上的所有属性全部拷贝到ns上
    if (mode & 2 && typeof value != 'string') for (var key in value) __webpack_require__.d(ns, key, function (key) { return value[key]; }.bind(null, key));
    return ns;//ns = {__esModule:true,default:'video'}
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

  // __webpack_public_path__
  __webpack_require__.p = "";

  // on error function for async loading
  __webpack_require__.oe = function (err) { console.error(err); throw err; };
  //刚开始的时候webpackJsonp是undefined,那么就给他一个空数组
  var jsonpArray = window["webpackJsonp"] = window["webpackJsonp"] || [];
  //给数组的push方法绑定数组本身,如果以后有人再调用oldJsonpFunction,就相当于调用jsonpArray.push
  var oldJsonpFunction = jsonpArray.push.bind(jsonpArray);
  //让数组的push方法指向另外一个函数webpackJsonpCallback
  jsonpArray.push = webpackJsonpCallback;
  //拷贝出来一个新的数组 
  jsonpArray = jsonpArray.slice();
  for (var i = 0; i < jsonpArray.length; i++) webpackJsonpCallback(jsonpArray[i]);
  var parentJsonpFunction = oldJsonpFunction;


  // Load entry module and return exports
  return __webpack_require__(__webpack_require__.s = "./src/main.js");
})
  ({

    "./src/main.js":
      (function (module, exports, __webpack_require__) {
        //e ensure
        eval(`
        document.querySelector('#play')
        .addEventListener('mouseover', () => {
           __webpack_require__.e(0)
           //ns = {__esModule:true,default:'video'}
           .then(__webpack_require__.t.bind(null, \"./src/video.js\", 7))
           .then(video => {
             console.log(video.default);
             })
          });`);
      })

  });