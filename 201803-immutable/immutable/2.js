let immutable = require('immutable');
let { Map, List } = immutable;
let obj1 = immutable.fromJS({ name: 'zfpx', age: 9, home: { name: '北京', number: 0 } });
// let obj2 = obj1.set('name', 'zfpx2');
// console.log(obj1 === obj2);
// console.log(obj1, obj2);
// console.log(obj1.home === obj2.home);
console.log(obj1.size);
console.log(obj1.count());
let obj3 = obj1.setIn(['home', 'name'], '山东');
console.log(obj3.get('name'), obj3.getIn(['home', 'name']));

let obj4 = obj3.update('age', val => val + 1);
console.log(obj4);
let obj5 = obj4.updateIn(['home', 'number'], val => val + 2);
console.log(obj5);
let obj6 = obj5.delete('name');
console.log(obj6);
let obj7 = obj5.clear();
console.log(obj7);
let obj8 = obj7.merge({ name: 'zfpx', age: 8 });
console.log(obj8);
console.log(obj8.toJS());
console.log(obj8.toJSON());
console.log(obj8.toObject());

console.log(...obj8.keys());
console.log(...obj8.values());
console.log(...obj8.entries());



