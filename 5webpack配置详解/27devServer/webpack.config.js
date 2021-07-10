const { resolve } = require("path");
const HtmlWebpackPlugin = require("html-webpack-plugin");

/**
 * entry: 入口文件
 */
module.exports = {
    entry: "./src/js/index.js",
    output: {
        //文件名称（指定目录）
        filename: "js/[name].js",
        //输出文件目录(将来所有资源输出的公共目录）
        path: resolve(__dirname,"build"),
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
    devServer: {
        // 运行代码的目录
        contentBase: resolve(__dirname,"build"),
        // 监视 contentBase 目录下的所有文件，一旦文件发生变化就会 重新加载
        watchContentBase: true,
        watchOptions: {
            // 忽略文件
            ignored: /node_modules/
        },
        // 启动gzip压缩
        compress: true,
        // 设置端口号
        port: 8888,
        //域名
        host: "localhost",
        // 自动打开游览器
        open: true,
        // 开启 HMR 热模块替换
        hot: true,
        // 处理一些基本启动信息以为，其余的内容都不展示
        quiet: true,
        // 如果出错了不要全屏提示
        overlay: false,
        // 服务器代理
        proxy: {
            // 一旦devServer（8888）接收到 /api/xxx 的请求，就会把请求转发到另一个服务器上（6666）
            "/api": {
                target: 'http://localhost:6666', //测试环境
                // 发送请求时，请求路径重写，将 /api/xxx 改成 /xxx(去掉 /api)
                pathRewirte: { 
                    "/^api": ""
                }
            }
        }
    },
    mode: "development",
}