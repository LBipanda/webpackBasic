const { resolve } = require("path")
const htmlWebpackPligin = require("html-webpack-plugin")

module.exports = {
    entry: "./src/index.js",
    output: {
        filename: "built.js",
        path: resolve(__dirname,"build")
    },
    module: {
        rules: [
            // {
            //     tset: /\.css$/,
            //     use: []
            // }
        ]
    },
    plugins: [
        // html-webpack-plugin 打包 html 资源
        // 功能：默认会创建一个空的 html，自动引入打包输出的所有资源（JS/CSS)
        new htmlWebpackPligin({
            // 复制 ./src/index.html 文件，自动引入打包输出的所有资源（JS/CSS)
            template: "./src/index.html"
        })
    ],
    mode: "development"
}