import "./main.css";
import "./index.less";
import "./iconfont/iconfont.css";

const add = (x, y) => {
return x + y;
}

console.log(add(10, 20)); 

const promise = new Promise((resolve) => {
setTimeout(() => {
 console.log("定时器执行完毕");
  resolve();
},1000)
})
  
console.log(promise);
  
