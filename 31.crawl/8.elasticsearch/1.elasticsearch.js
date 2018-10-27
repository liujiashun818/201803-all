let elasticsearch = require('elasticsearch');
let client = new elasticsearch.Client({
    host: 'localhost:9200'
});
(async function () {
    let id = Date.now(); //先生成一个唯一的ID号
    await client.create({
        index: 'person',
        type: 'city',
        id,
        body: {
            name: id,
            age: id
        }
    });
    await client.update({
        index: 'person',
        type: 'city',
        id,
        body: {
            doc: {
                name: `更新后的${id}`
            }
        }
    });
    await client.delete({
        index: 'person',
        type: 'city',
        id
    });
})().then(ret => console.log(ret), err => console.log(err));