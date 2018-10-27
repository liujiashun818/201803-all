const express = require('express');
const app = express();
/**
 * 1 2 3 4 5 6 7...
 * pageNum=2 pageSize=3
 * /list [4,5,6]
 * /item/:id /item/4 {id:4,tilte:'标题4',url:'http://localhost:8000/item/4'}
 */
app.get('/list', function (req, res) {
    let { pageNum, pageSize } = req.query;
    let ids = [];
    //pageNum=2 pageSize=3  i=3 i=6 456
    for (let i = (pageNum - 1) * pageSize; i < pageNum * pageSize; i++) {
        ids.push(i + 1);
    }
    res.json(ids);
});
app.get('/item/:id', function (req, res) {
    let id = req.params.id;
    res.json({
        id,
        createAt: Date.now(),
        title: `标题${id}`,
        url: `http://localhost:8000/item/${id}`
    });
});
app.listen(8000);