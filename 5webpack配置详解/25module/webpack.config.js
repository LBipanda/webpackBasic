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
        chunkFilename: "js/[name]_chunk.js",//设置非入口chunk的名称
    },
    module:{
        rules:[
            // loader的配置
            {
                test: /\.css$/,
                // 多个loader 用use
                use: ["style-loader","css-loader"]
            },
        ]
    },
    plugins:[
        new HtmlWebpackPlugin()
    ],
    mode: "development",
}