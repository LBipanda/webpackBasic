import {add} from "./test"

console.log("index文件被加载了~~~~");
console.log(add(1,2));


1. 
/**
 * 1、eslint不认识window、 navigator全局变量
 * 解决:需要修改package.json 中 eslintconfig配置
 *  "env": {
 *    "browser": true
 *   }
 * 2、serviceweorker 必须运行在服务器上
 * 解决：
 *      npm i serve -g
 *      serve -s build启动服务器，将build目录下所有资源作为静态资源暴露出去
 */
//注册serviceweorker
//处理兼容性问题
if("serviceWorker" in navigator){
  window.addEventListener("load",() => {
    navigator.serviceWorker.register("/service-worker.js").then(() => {
      console.log("设置成功");
    }).catch(() => {
      console.log("设置失败");
    })
  }) 
}

