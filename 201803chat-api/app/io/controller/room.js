const { Controller } = require('egg');
// socket.emit('ping','hello','world');
class RoomController extends Controller {
    async createRoom() {
        let { app, ctx } = this;
        let name = ctx.args[0];
        //await app.model.Room.create({ name });
        let room = new app.model.Room({ name });
        await room.save();
        ///向客户端回发消息
        ctx.socket.emit('roomCreated', `房间已经创建，ID为${room._id}`);
    }
}
module.exports = RoomController;