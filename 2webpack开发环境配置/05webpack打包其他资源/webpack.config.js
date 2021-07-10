const { resolve } = require("path");
const htmlWebpackPlugin = require("html-webpack-plugin");

module.exports = {
    mode: "development",
    entry: "./src/index.js",
    output: {
        filename: "built.js",
        path: resolve(__dirname,"build")
    },
    module:{
        rules:[
            {
                test: /\.css$/,
                use:["style-loader","css-loader"]
            },
            //打包其他资源（除 html/css/js 资源以外的资源
            {
                exclude: /\.(html|css|js)/,
                loader: "file-loader",
                options: {
                    name: "[hash].[ext]"
                }
            }
        ]
    },
    plugins: [
        new htmlWebpackPlugin({
            template: "./src/index.html"
        })
    ]
}