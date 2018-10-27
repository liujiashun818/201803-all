const express = require('express');
const path = require('path');
let app = express();
app.get('/', function (req, res) {
    res.setHeader('Content-Type', 'text/html;charset=utf8');
    res.sendFile(path.resolve(__dirname, 'iframe.html'));
});
app.get('/clock', function (req, res) {
    setInterval(function () {
        res.write(`
        <script type="text/javascript">
           window.parent.setClock('${new Date().toLocaleTimeString()}');
        </script>
           
        `);
    }, 1000);
});
app.listen(9000);