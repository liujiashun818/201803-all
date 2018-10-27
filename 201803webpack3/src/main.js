let name = require('./a1');
document.querySelector('#root').innerHTML = name;
if (module.hot) {
    module.hot.accept('./a1', function () {
        document.querySelector('#root').innerHTML = require('./a1');
    });
}