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
 * 缓存:
 * 1、babel缓存
 * cacheDirectory: true 
 * 作用：让第二次打包构建速度更快
 * 2、文件资源媛存
 *      hash:每次wepack构建时会生成一个唯一的hash值。
 *          问题:因为js和css同时使用一个hash值。
 *          如果重新打包，会导致所有缓存失效。（可能我却只改动一个文件)
 *      chunkhash:根据chunk生成的hash值。如果打包来源于同一个chunk，那么hash值就一样
 *          因为css是在js中被引入的，所以同属于一个chunk
 *      contenthash:根据文件的内容生成hash值。不同文件hash值一定不一样 （常用这个）
 * 作用：让代码上线运行缓存更好使用
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