import $ from "jquery";

console.log($)

const sum = (x, y) => {
  return x * y;
}

console.log(sum(10, 30)); 

// 通过 js 代码，让某个文件单独打包成一个chunk
// import动态导入语法: 能将某个文性单独打
import(/*webpackChunkName: 'test'*/"./test.js").then(()=>{
  console.log("文件加载成功");
}).catch(() =>{
  console.log("文件加载失败");
})


