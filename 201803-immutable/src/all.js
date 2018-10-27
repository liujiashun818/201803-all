let co = require('co');
function* gen1() {
    yield new Promise((resolve, reject) => setTimeout(resolve, 1000));
    yield new Promise((resolve, reject) => setTimeout(resolve, 1000));
}
function* gen2() {
    yield new Promise((resolve, reject) => setTimeout(resolve, 1000));
    yield new Promise((resolve, reject) => setTimeout(resolve, 1000));
}
function all(gens) {
    return Promise.all(gens.map(item => co(item)));
}
console.time('cost');
all([gen1, gen2]).then(function () {
    console.timeEnd('cost');
});
