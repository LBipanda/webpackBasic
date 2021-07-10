const {resolve} = require("path");
//下载插件
// 功能：默认会创建一个空的 html，自动引入打包输出的所有资源（JS/CSS)
const HtmlWebapckPlugin = require("html-webpack-plugin");

module.exports = {
    // entry: "./src/index.js",
    // 多入口
    entry: {
        index: "./src/index.js",
        test: "./src/test.js"
    },
    output: {
        // [name]  取文件名
        filename: "js/[name].[contenthash].js",
        path: resolve(__dirname,"build")
    },
    module: {
        rules: [
            {
                test: /\.js$/,
                exclude: /node_modules/,
                loader: "babel-loader",
                // 优先执行
                enforce: "pre",
                options: {
                    //预设:指示babel做怎么样的兼容性处理
                    presets: [
                        [
                            "@babel/preset-env",
                            {
                                // 按需加载
                                useBuiltIns: "usage",
                                // 指定 core-js 版本
                                corejs: {
                                    version: 3,
                                },
                                //指定兼容性做到哪个版本浏览器
                                targets: {
                                    chrome : "60",
                                    firefox: "60",
                                    ie: "9",
                                    safari: "10",
                                    edge: "17"
                                }
                            }
                        ]
                    ],
                    // 开启babel缓存
                    // 第二次构建时会读取之前的缓存
                    cacheDirectory: true,
                }
            },
        ]
    },
    plugins:[
        new HtmlWebapckPlugin({
            template: "./src/index.html",
            // 压缩html代码
            minify: {
                //移除空格
                collapseWhitespace: true,
                // 移除注释
                removeComments: true
            }
        }),
    ],
    //压缩 JS 代码
    mode: "production"
}