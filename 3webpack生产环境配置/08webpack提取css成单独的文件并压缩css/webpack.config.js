const {resolve} = require("path");
const HtmlWebpackPlugin = require("html-webpack-plugin");
const MiniCssExtractPlugin = require("mini-css-extract-plugin");
// 压缩css文件 optimize-css-assets-webpack-plugin
const OptimizeCssAssetsWebpackPlugin = require("optimize-css-assets-webpack-plugin");

module.exports = {
    entry: "./src/index.js",
    output: {
        filename: "built.js",
        path: resolve(__dirname,"build")
    },
    module: {
        rules: [
            {
                test: /\.css$/,
                use: [
                    // "style-loader",
                    //这个1oader取代style-loader 作用:提取js中的css成单独文件
                    MiniCssExtractPlugin.loader,
                    "css-loader",
                    /**
                     * css兼容性处理: postcss --> postcss-loader postcss-preset-env
                     */
                     //使用loader的默认配置
                     // "postcss-loader" ,
                     //修改 loader 的配置
                    {
                        loader: 'postcss-loader',
                        ident: 'postcss',
                        options: {
                        postcssOptions: {
                            //或者将插件引入写在单独的配置js中
                            //config: './config/postcss.config.js',
                            plugins: () => [
                                require('postcss-preset-env')()
                            ]
                    }
                }
            }
                ]
            }
        ]
    },
    plugins: [
        new HtmlWebpackPlugin({
            template: "./src/index.html"
        }),
        new MiniCssExtractPlugin({
            // 对输出的css进行重命名
            filename: "css/built.css"
        }),
        //压缩css
        new OptimizeCssAssetsWebpackPlugin()
    ],
    mode: "development"
}