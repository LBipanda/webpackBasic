const {resolve} = require("path");
const HtmlWebpackPlugin = require("html-webpack-plugin");

module.exports = {
    entry: "./src/index.js",
    output: {
        filename: "built.js",
        path: resolve(__dirname,"build")
    },
    module: {
        rules: [
            /**
             * JS兼容性处理 babel-loader @babel/core @babel/preset-env
             * 1、基本js兼容性处理--> @babel/preset-env  缺点:只能转换基本语法,如如 promise 不能转换。（不建议使用）
             * 2、全部 JS 兼容性处理--> @babel/polyfil1  缺点：只需要解决部分JS兼容问题 ，但是它将所有兼容代码都引入了，体积太大（不建议使用）
             * 3、需要做兼容性处理的就做: 按需加载 --> core-js
             */
            {
                test: /\.js$/,
                exclude: /node_modules/,
                loader: "babel-loader",
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
                }
            }
        ]
    },
    plugins: [
        new HtmlWebpackPlugin({
            template: "./src/index.html"
        }),
        
    ],
    mode: "development"
}