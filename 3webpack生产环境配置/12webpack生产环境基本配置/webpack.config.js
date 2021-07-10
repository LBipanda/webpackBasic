const {resolve} = require("path");
//下载插件
// 功能：默认会创建一个空的 html，自动引入打包输出的所有资源（JS/CSS)
const HtmlWebapckPlugin = require("html-webpack-plugin");
// 功能:提取js中的css成单独文件
const MiniCssExtractPlugin = require("mini-css-extract-plugin");
// 功能：压缩css文件
const optimizeCssAssetsWebpackPlugin = require("optimize-css-assets-webpack-plugin");
// JS语法检查 eslint-loader已被官方弃用，现在使用 eslint-webpack-plugin 插件
const ESlintWebpackPlugin = require("eslint-webpack-plugin");

module.exports = {
    entry: "./src/index.js",
    output: {
        filename: "js/built.js",
        path: resolve(__dirname,"build")
    },
    module: {
        rules: [
            {
                test: /\.css$/,
                use:[
                    // 创建 style 标签，将css样式以style标签的形式插入到html中
                    // "style-loader",
                    //这个1oader取代style-loader 作用:提取js中的css成单独文件
                    {
                        loader: MiniCssExtractPlugin.loader,
                        options: {
                            // 由于图片打包到指定的文件夹下面，使得背景图background-image: url(图片地址)能访问图片的地址
                            // 所以在url前加上公共路径，以便能访问到图片
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
                    // 创建 style 标签，将css样式以style标签的形式插入到html中
                    // "style-loader",
                    //这个1oader取代style-loader 作用:提取js中的css成单独文件
                    {
                        loader: MiniCssExtractPlugin.loader,
                        options: {
                            // 由于图片打包到指定的文件夹下面，使得背景图background-image: url(图片地址)能访问图片的地址
                            // 所以在url前加上公共路径，以便能访问到图片
                            publicPath: '../',//设置公共路径
                        }
                    },
                    "css-loader",
                    "less-loader"
                ]
            },
            /**
             * JS兼容性处理 babel-loader @babel/core @babel/preset-env core-js
             * 1、基本js兼容性处理--> @babel/preset-env  缺点:只能转换基本语法,如如 promise 不能转换。（不建议使用）
             * 2、全部 JS 兼容性处理--> @babel/polyfil1  缺点：只需要解决部分JS兼容问题 ，但是它将所有兼容代码都引入了，体积太大（不建议使用）
             * 3、需要做兼容性处理的就做: 按需加载 --> core-js
             */
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
                }
            },
            {
                //处理图片资源
                // 缺点：默认处理不了 html 中的 img 图片（所以我们要使用 html-loader ）
                test: /\.(jpg|png|gif)$/,
                //使用一个 loader
                // 下载 url-loader file-loader
                loader: "url-loader",
                options: {
                    // 图片大小小于 21kb，会被 base64 处理(项目中一般限制在 8kb~~12kb)
                    // 优点：减少请求数量（减轻服务器压力）
                    // 缺点：图片体积会变大（文件请求速度变慢）
                    limit: 21 * 1024,
                    outputPath: "images",//输出到指定的文件夹下
                }
            },
            {
                //处理html文件的img图片（负责引入img，从而能被url-loader进行处理)
                test: /\.html$/,
                loader: "html-loader",
                options: {
                    //问题:因为 html-loader 默认使用es6模块化解析，而 url-loader 引入图片是commonjs模块化解析，所以解析后会出问题（图片展示不出来）
                    //解决:关闭 html-loader 的es6模块化解析。使用comnonjs解析
                    esModule: false
                }
            },
            //打包其他资源（除 html/css/js/图片 资源以外的资源)，下载 file-loader
            // 这里有个坑，如果你引入了 less或sass 下面 exclude 要设置 less或sass，并且你要在iconfont文件里面的 iconfont.css 改成
            // iconfont.less或iconfont.sass 文件，没有引入 less或sass 的话，不需要改 iconfont.css ,使用exclude设置 css就行
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
            filename: "css/built.css"
        }),
        new optimizeCssAssetsWebpackPlugin(),

        // 设置检查规则:
        // package.json 中 eslintconfig 中设置~
        // "eslintConfig": {
        //     "extends": "airbnb-base"
        // }
        // airbnb --> eslint-config-airbnb-base eslint-plugin-import eslint
        // new ESlintWebpackPlugin({
        //     // 注意： 只检查自己写的源代码，不检查第三方的库
        //     // 设置要检查的文件
        //     extensions: ['js', 'json'],
        //     // 设置不要检查的文件
        //     exclude: '/node_modules/'
        // })
    ],
    //压缩 JS 代码
    mode: "production"
}