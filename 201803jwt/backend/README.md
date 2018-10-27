## 安装依赖的模块
```js
cnpm i express morgan jsonwebtoken bcryptjs  mongoose cors -S
```
- express 
- morgan 记录访问日志
- jsonwebtoken 
- bcryptjs 加密密码
- mongoose
- cors 让服务器端支持域域


## 加密
- hash md5 sha1 哈希算法
   1 -> xxxxxxx
- 加盐哈希 hmac 计算哈希的时候还要加上盐址   