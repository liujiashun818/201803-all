
function accum(str) {
    return str.split('').map((item, index) => {
        let result = '';
        for (let i = 0; i <= index; i++) {
            result += (i == 0 ? item.toUpperCase() : item.toLowerCase());
        }
        return result;
    }).join('-');
}
console.log(accum('abcd'));
console.log(accum('RqaEzty'));
console.log(accum('cwAt'));