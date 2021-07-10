const { resolve } = require("path");
const HtmlWebpackPlugin = require("html-webpack-plugin");

/**
 * entry: 入口文件
 */
module.exports = {
    entry: "./src/index.js",
    output: {
        //文件名称（指定目录）
        filename: "js/[name].js",
        //输出文件目录(将来所有资源输出的公共目录）
        path: resolve(__dirname,"build"),
        //所有资源引入公共路径前缀--〉 'imgs/a.jpg’ --> " ./imgs/a.jpg"
        publicPath: "./",//一般用于生产环境
        chunkFilename: "js/[name]_chunk.js",//设置非入口chunk的名称
        library: "[name]",//整个库向外暴露的变量名
        // libraryTarget: "window",//变量名添加到那个上 browser
        // libraryTarget: "global",//变量名添加到那个上 node
        // libraryTarget: "window",//变量名添加到那个上 window
        libraryTarget: "common",
    },
    module:{
        rules:[]
    },
    plugins:[
        new HtmlWebpackPlugin()
    ],
    mode: "development",
}