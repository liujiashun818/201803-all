module.exports = app => {
    let mongoose = app.mongoose;
    let Schema = mongoose.Schema;
    //定义房间的模型骨架
    let RoomSchema = new Schema({
        name: { type: String, required: true },
        createAt: { type: Date, default: Date.now }
    });
    //定义数据库操作模型
    return mongoose.model('Room', RoomSchema);
}
/**
 * app.model=
 * {
 *   Room:Room
 * }
 */