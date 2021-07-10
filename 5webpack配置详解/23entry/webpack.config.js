const { resolve } = require("path");
const HtmlWebpackPlugin = require("html-webpack-plugin");

/**
 * entry: 入口文件
 * 1、String  ----->  ./src/index.js
 *      单入口
 *      打包形成一个chunk，输出一个bundle文件
 *      如果output中的filename不指定输出的chunk名称，默认chunk名称是 main
 * 2、Array   ----->   ["./src/index.js","./src/add.js"]
 *      多入口
 *      所有入口文件最终只会形成一个chunk，输出出去只有一个bundle文件。|
 *          -->只有在HMR功能中让html热更新生效~
 * 3、Object
 *      多入口
 *      有几个入口文件就形成几个chunk，输出几个bundle文件
 *      此时chunk的名称是key
 * 
 *      ---》 特殊用法
 *          {   
 *              //所有入口文件最终只会形成一个chunk，输出出去只有一个bundle文件
 *              index: ["./src/index.js","./src/count.js"],
 *              //打包形成一个chunk，输出一个bundle文件
                add: "./src/add.js",
 *          }
 */
module.exports = {
    entry: "./src/index.js",
    // entry: ["./src/index.js","./src/add.js"],
    // entry: {
    //     index: "./src/index.js",
    //     add: "./src/add.js",
    // },
    // entry: {
    //     index: ["./src/index.js","./src/count.js"],
    //     add: "./src/add.js",
    // },
    output: {
        filename: "[name].js",
        path: resolve(__dirname,"build")
    },
    module:{
        rules:[]
    },
    plugins:[
        new HtmlWebpackPlugin()
    ],
    mode: "development",
}