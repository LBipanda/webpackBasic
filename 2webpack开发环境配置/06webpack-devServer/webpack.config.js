const { resolve } = require("path");
const htmlWebpackPlugin = require("html-webpack-plugin");

module.exports = {
    mode: "development",
    entry: "./src/index.js",
    output: {
        filename: "built.js",
        path: resolve(__dirname,"build")
    },
    module:{
        rules:[
            {
                test: /\.css$/,
                use:["style-loader","css-loader"]
            },
            //打包其他资源（除 html/css/js 资源以外的资源
            {
                exclude: /\.(html|css|js)/,
                loader: "file-loader",
                options: {
                    name: "[hash].[ext]"
                }
            }
        ]
    },
    plugins: [
        new htmlWebpackPlugin({
            template: "./src/index.html"
        })
    ],
    // 开发服务器 devServer：用来自动化（自动编译，自动打开游览器，自动刷新游览器）
    // 下载 npm i webpack-dev-server -D
    // 特点：只会在内存中编译打包，不会有任何输出
    // 启动 devServer 指令为：npx webpack serve
    devServer: {
        // 项目构建后的路径
        contentBase: resolve(__dirname,"build/index.html"),
        // 启动 gzip 压缩
        compress: true,
        // 端口号
        port: 3000,
        // 自动打开游览器
        open: true
    }
}