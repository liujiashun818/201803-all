module.exports = function(app){
    app.get('/api/users',(req,res)=>{
        res.send([{id:1,name:'zfpx1'}]);
    });
    app.get('/api/about',(req,res)=>{
        res.send('about');
    });
}