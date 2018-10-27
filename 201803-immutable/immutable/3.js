let immutable = require('immutable');
let { Map, List } = immutable;
let arr1 = List([1, 2, 3]);
let arr2 = arr1.push(4);
let arr3 = arr2.pop();
let arr4 = arr3.map(item => item * 2);
let arr5 = arr4.filter(item => item < 5);
console.log(arr5);
let arr6 = arr5.update(1, val => val + 1);
console.log(arr6);
let arr7 = arr6.delete(0);
console.log(arr7);
let arr8 = arr7.push(10);
let arr9 = arr8.last();
console.log(arr9);
//[0,1,2,3,4,5,6,7,8,9,10]
console.log(immutable.Range(1, 6));//[1,2,3,4,5]
//4,5 -> 8 10 => 18
let ret = immutable.Range(1, 6).skip(3).map((n) => n * 2).filter((n) => n % 2 == 0).take(2).reduce((a, b) => a + b, 0);
console.log(ret);
