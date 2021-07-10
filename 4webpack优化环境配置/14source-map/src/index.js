import print from "./print.js";

import "./main.css";

import "./index.less";

//引入 iconfont 字体图标库
import "./iconfont/iconfont.less";

console.log("Hello LBipanda");

function add(x, y){
    return x + y;
}

console.log(add(10, 20));
print();

//一旦 module.hot为true，说明开启了HMR功能。 -->  让HMR功能代码生效
if(module.hot){
    //方法会监听print.js 文件的变化，一旦发生变化，其他模块不会重新打包构建。
    //会执行后面的回调函数
    module.hot.accept("./print.js", function(){
        print();
    })
}