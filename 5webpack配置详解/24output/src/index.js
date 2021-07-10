// import { add } from "./add.js";
import { count } from "./count.js";

console.log("index文件被加载了");

// console.log(add(1, 2));
console.log(count(10, 5));

import(/*webpackChunkName: 'add'*/"./add").then(({ default: add }) => {
    console.log(add(11, 22));
})