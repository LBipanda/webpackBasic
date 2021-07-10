const {resolve} = require("path");
const webpack = require("webpack");

/**
 * 使用 dll 技术，对某些库（第三方库：jQuery、react、vue...）进行单独打包
 * 当你运行webpack 时，默认查找webpack.config.js配置文件
 * 需求:需要运行webpack.dll.js文件
 * --> webpack --config webpack.dll.js
 */

module.exports = {
    entry: {
        //最终打包生成的[name] -->jquery
        // [ "jquery" ] -->要打包的库是jquery
        jquery: ["jquery"],
    },
    output: {
        filename: "[name].js",
        path: resolve(__dirname,"dll"),
        library: "[name]_[hash]",//打包的库里面向外暴露出去的内容叫什么名字
    },
    plugins:[
        // 打包生成一个 mainfest.json ====》 提供和 jquery 的映射
        new webpack.DllPlugin({
            name: "[name]_[hash]",//映射的库的暴露的内容名称
            path: resolve(__dirname,"dll/mainfest.json")//输出文件路径
        })
    ],
    mode: "production"
}  