const { resolve } = require("path");
const htmlWebpackPlugin = require("html-webpack-plugin");

module.exports = {
    entry: "./src/index.js",
    output: {
        filename: "built.js",
        path: resolve(__dirname,"build")
    },
    module: {
        rules:[
            {
                test: /\.less$/,
                use:["style-loader", "css-loader", "less-loader"]
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
            }
        ]
    },
    plugins:[
        new htmlWebpackPlugin({
            template: "./src/index.html"
        })
    ],
    mode: "development"
}