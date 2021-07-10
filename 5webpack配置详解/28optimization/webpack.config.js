const { resolve } = require("path");
const HtmlWebpackPlugin = require("html-webpack-plugin");
const TerserWebpackPlugin = require("terser-webpack-plugin");

/**
 * entry: 入口文件
 */
module.exports = {
    entry: "./src/js/index.js",
    output: {
        //文件名称（指定目录）
        filename: "js/[name][contenthash:10].js",
        //输出文件目录(将来所有资源输出的公共目录）
        path: resolve(__dirname,"build"),
        chunkFilename: "js/[name][contenthash:10]_chunk.js"
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
    optimization: {
        splitChunks: {
            chunks: "all",
            // 一下都是默认值，可以不写~~~~~~~~~~~~~~~~~~~~~~~~~~
            // minSize: 30 * 1024,//分割的chunk最小为30kb
            // maxSize: 0,//最大没有限制
            // minChunks: 1,//要提取的 chunks 最少要被引用1次
            // maxAsyncRequests: 5,//按需加载时，并行加载的文件的最大数量
            // maxInitalRequests: 3,//入口JS文件最大并行请求数量
            // automaticNameDelimiter: "~",//名称连接符
            // name: true,//可以使用命名规则
            // cacheGroups: {//分割chunk的组
            //     // node_modules文件会被打包到vendors组的chunk中 ---> vendors~xxx.js
            //     //并且要满足上面的公共规则
            //     vendors: {
            //         test: /[\\/]node_modules[\\/]/,
            //         // 优先级
            //         priority: -10,
            //     },
            //     default: {
            //         //要提取的 chunks 最少要被引用2次
            //         minChunks: 2,
            //         // 优先级
            //         priority: -20,
            //         //如果当前要打包的模块。和之前己经被提取的模块是同一个，就会复用，而不是重新打包模块
            //         reuseExistingChunk: true,
            //     }
            // }
        },
        //将当前模块记录其他模块的 hash 单独打包为一个文件 runtime
        //解决:修改 optimization打包时 a文件导致b文件的contenthash变化
        runtimeChunk: {
            name: entrypoint => `runtime-${entrypoint.name}`
        },
        minimizer: [
            //配置生产环境的压缩方案:js和lcss
            new TerserWebpackPlugin({
                // // 开始缓存
                // cache: true,
                // 多进程打包
                parallel: true,
                // // 启用 sourceMap
                // sourceMap: true,
            })
        ],
    },
    mode: "production",
    //解析模块的规则
    resolve: {
        // 配置解析模块路径别名,优点：简写路径，缺点：路径没有提示
        alias: {
            $css: resolve(__dirname,"src/css"),
        },
        //配置省略文件路径的后缀名
        extensions: [".js",".json",".css"],
        // 告诉 webpack 解析模板是去哪个目录
        modules: [resolve(__dirname,"../../node_modules"),"node_modules"]
    },
}