const {resolve} = require("path");
//下载插件
// 功能：默认会创建一个空的 html，自动引入打包输出的所有资源（JS/CSS)
const HtmlWebapckPlugin = require("html-webpack-plugin");
// 功能:提取js中的css成单独文件
const MiniCssExtractPlugin = require("mini-css-extract-plugin");
// 功能：压缩css文件
const optimizeCssAssetsWebpackPlugin = require("optimize-css-assets-webpack-plugin");
// JS语法检查 eslint-loader已被官方弃用，现5在使用 eslint-webpack-plugin 插件
const ESlintWebpackPlugin = require("eslint-webpack-plugin");


/**
 * tree shaking 去除无用代码
 * 前提: 1、必须使用ES6模块化  2、开启production环境
 * 作用：去除程序中没有使用的代码，减少代码体积
 * 
 * 在package.json中配置
 * "sideEffects": false   所有代码都没有副作用（都可以进行tree shaking)
 *      问题:可能会把css/@babel/polyfill   当做副作用文件给干掉
 *      解决办法：  sideEffects": ["*.css","*.less"]
 */
module.exports = {
    entry: "./src/index.js",
    output: {
        filename: "js/built.[contenthash].js",
        path: resolve(__dirname,"build")
    },
    module: {
        rules: [
            {
                test: /\.css$/,
                use:[
                    {
                        loader: MiniCssExtractPlugin.loader,
                        options: {
                            publicPath: '../',//设置公共路径
                        }
                    },
                    "css-loader"
                ]
            },
            {
                test: /\.less$/,
                // 优先执行
                enforce: "pre",
                use:[
                    {
                        loader: MiniCssExtractPlugin.loader,
                        options: {
                            publicPath: '../',//设置公共路径
                        }
                    },
                    "css-loader",
                    "less-loader"
                ]
            },
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
            {
                test: /\.(jpg|png|gif)$/,
                loader: "url-loader",
                options: {
                    limit: 21 * 1024,
                    outputPath: "images",//输出到指定的文件夹下
                }
            },
            {
                test: /\.html$/,
                loader: "html-loader",
                options: {
                    esModule: false
                }
            },
            {
                exclude: /\.(html|css|less|js|jpg|png|gif)/,
                loader: "file-loader",
                options: {
                    outputPath: "iconfont"
                }
            }
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
        new MiniCssExtractPlugin({
            // 对输出的css进行重命名并指定输出路径
            filename: "css/built.[contenthash].css"
        }),
        new optimizeCssAssetsWebpackPlugin(),
    ],
    //压缩 JS 代码
    mode: "production"
}