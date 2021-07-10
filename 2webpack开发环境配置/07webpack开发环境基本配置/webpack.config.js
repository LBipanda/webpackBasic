/**
 * webpack.config.js 是 webpack 的配置文件
 *      作用：只是 webpack 干那些活（ 当你运行 webpack 的时候，会加载里面的配置 ） 
 * 
 * 所有的构建工具都基于 nodeJS 平台运行的~~，模块化默认采用 commonJS
 */

    // 开发环境配置:能让代码运行
    // 运行项目指令;
    // webpack 会将打包结果输出出去
    // npx webpack serve 只会在内存中编译打包，没有输出

// resolve是用来拼接绝对路径的方法
const { resolve } = require("path");

//引入插件
const HtmlWebpackPlugin = require("html-webpack-plugin");

module.exports = {
    // webpack 配置
    // mode 模式
    mode: "development",
    // mode: "production",
    // 入口起点
    entry: "./src/index.js",
    // 输出
    output: {
        //输出文件名
        filename: "built.js",
        //输出路径
        // __dirname 是 nodejs 的变量，代表当前文件的目录绝对路径
        path: resolve(__dirname,"build")
    },
    // loader 的配置
    module: {
        rules: [
            // 详细的rules配置
            // 打包样式资源
            {
                test: /\.less$/,
                //使用那些 loader 进行处理（ 使用多个loader 用 use ）
                // 下载 style-loader css-loader less-loader 
                use: [ //use数组中的 loader 执行顺序，从右到左，从下到上依次解析
                    // 创建 style 标签，将css样式以style标签的形式插入到html中
                    "style-loader",
                    // 用于解析css文件,将解析后的数据放入到 打包后的 js文件中
                    "css-loader",
                    //将 less 文件解析成 css 文件
                    "less-loader",
                ],
            },
            {
                test: /\.css$/,
                //使用那些 loader 进行处理（ 使用多个loader 用 use ）
                // 下载 style-loader css-loader 
                use: [ //use数组中的 loader 执行顺序，从右到左，从下到上依次解析
                    // 创建 style 标签，将css样式以style标签的形式插入到html中
                    "style-loader",
                    // 用于解析css文件
                    "css-loader",
                ],
            },
            {
                //处理图片资源
                // 缺点：默认处理不了 html 中的 img 图片（所以我们要使用 html-loader ）
                test: /\.(jpg|png|gif)$/,
                //使用一个 loader
                // 下载 url-loader
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
                // 下载 html-loader
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
                    name: "[hash].[ext]",
                    outputPath: "iconfont"
                }
            }
        ]
    },
    // plugins 的配置
    plugins: [
        // html-webpack-plugin 打包 html 资源(下载 html-webpack-plugin)
        // 功能：默认会创建一个空的 html，自动引入打包输出的所有资源（JS/CSS)
        new HtmlWebpackPlugin({
            // 复制 ./src/index.html 文件，自动引入打包输出的所有资源（JS/CSS)
            template: "./src/index.html"
        }),
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