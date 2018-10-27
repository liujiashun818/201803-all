function exec() {
    let p;
    console.log(p.name);
}
process.on('uncaughtException', function (err) {
    //console.log(err.stack);
});
setTimeout(function () {
    console.log('hello');
}, 1000);
exec();