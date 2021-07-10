const { resolve } = require("path")
const htmlWebpackPligin = require("html-webpack-plugin")
const AddAssetHtmlWebpackPlugin = require("add-asset-html-webpack-plugin")
const webpack = require("webpack")

module.exports = {
    entry: "./src/index.js",
    output: {
        filename: "built.js",
        path: resolve(__dirname,"build")
    },
    plugins: [
        // html-webpack-plugin 打包 html 资源
        // 功能：默认会创建一个空的 html，自动引入打包输出的所有资源（JS/CSS)
        new htmlWebpackPligin({
            // 复制 ./src/index.html 文件，自动引入打包输出的所有资源（JS/CSS)
            template: "./src/index.html"
        }),
        //告诉 webpack 那些库不参与打包，同时使用的名称也得变
        new webpack.DllReferencePlugin({
            manifest: resolve(__dirname,"dll/mainfest.json")
        }),
        // 使用add-asset-html-webpack-plugin动态添加dll.js到html。
        // 将某个文件打包输出去。并在html中自动引入该资源
        new AddAssetHtmlWebpackPlugin({
            filepath: resolve(__dirname,"dll/jquery.js")
        })
    ],
    mode: "production"
}