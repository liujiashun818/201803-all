let less = require('less');
less.render(`
@color:red;
body{color:@color}
`, (err, output) => {
        console.log(output.css);
    });