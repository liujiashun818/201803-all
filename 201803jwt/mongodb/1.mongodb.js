let mongoose = require('mongoose');
//连接数据库
let DB_URL = 'mongodb://localhost:27017/201803jwt';
//连接数据库之后会会返回一个连接对象
let connection = mongoose.createConnection(DB_URL, { useNewUrlParser: true });
//定义一个用户的Schema ,规定了用户集合里的文档有两个字段类型分别是字符串和数字
//Scheme并没有操作数据库的能力
let UserSchema = new mongoose.Schema({
    name: String,
    age: Number
}, { collection: 'user' });// 如果你指定Scheme的时候指定了connection的值，那么会使用这个值作为集合的名字
//通过connection可以定义一个模型，这个模型就可以操作数据库了
//集合的名字如果没有指定，就是模型名转小写再转复数 User-user-users
let User = connection.model('User', UserSchema);
//保存一个文档 
/**
User.create({ name: 'zfpx1', age: 1 }, (err, doc) => {
    console.log(err);
    console.log(doc);
});
 */
//_id是mongodb帮我们生成的一个主键，不会重复，可以用来标识每一个文档 
//__v是内部使用，用来加锁解决并发问题
/**
 * Entity实体
 * 是用来描述一个个体的
 */
/**
let user1 = new User({ name: 'zfpx2', age: 2 });
console.log(user1);
//调用自己的save方法可以把自己保存到数据库里
user1.save((err, doc) => {
    console.log(err);
    console.log(doc);
});
*/

//调用自己的save方法可以把自己保存到数据库里
//save方法，其实所有的mongoose方法都会返回一个promise
/**
async function insert(obj) {
    let user = new User(obj);
    await user.save();
    return user;
}
let user = insert({ name: 'zfpx3', age: 3 });
user.then(data => console.log(data));
 */
//1参数是更新的条件 2参数是更新后的值 3参数是操作之后的回调函数
//inc是一个操作符，表示要把原来的值累加1
/**
User.update({ name: 'zfpx3' }, { $inc: { age: -2 } }, (err, result) => {
    console.log(result)
});
 */
//{ ok: 1, nModified: 1, n: 1 }
// ok=1表示操作成功 nModified:1表示实际更新的条目数是1 n:1表示符合条件的个数
//update默认只会匹配第一条
//1参数是删除 的条件
/**
User.remove({ name: 'zfpx3' }, (err, result) => {
    console.log(result);
    // { ok: 1, n: 1 }  ok=1表示操作成功 n=1表示删除的条数
    //更新的话只会更新匹配记录的第一条，删除的默认会删除所有的记录
});
 */
/**
 * User模型
 * user针对的是自己
 * User create = user.save
 * User update = user.update
 * User.remove = user.remove
 */
User.find({ name: 'zfpx4' }, (err, docs) => {
    console.log(docs);
    docs[0].remove();
});
User.remove({});


