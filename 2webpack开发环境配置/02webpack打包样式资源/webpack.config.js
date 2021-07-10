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
const htmlWebpackPlugin = require("html-webpack-plugin");

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
            // 打包样式资源 既可以打包
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
                ]
            },
            {
                test: /\.css$/,
                //使用那些 loader 进行处理（ 使用多个loader 用 use ）
                // 下载 style-loader css-loader less-loader 
                use: [ //use数组中的 loader 执行顺序，从右到左，从下到上依次解析
                    // 创建 style 标签，将css样式以style标签的形式插入到html中
                    "style-loader",
                    // 用于解析css文件
                    "css-loader",
                ]
            },
        ]
    },
    // plugins 的配置
    plugins: [
        // html-webpack-plugin 打包 html 资源(下载 html-webpack-plugin)
        // 功能：默认会创建一个空的 html，自动引入打包输出的所有资源（JS/CSS)
        new htmlWebpackPlugin({
            // 复制 ./src/index.html 文件，自动引入打包输出的所有资源（JS/CSS)
            template: "./src/index.html"
        })
    ],
}