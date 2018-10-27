let express = require('express');
let morgan = require('morgan');
let app = express();
app.use(morgan('dev'));
app.get('/users',function(req,res){
    res.send(req.url);
  });
app.get('/api/users',function(req,res){
  res.send(req.url);
});
app.listen(3000);