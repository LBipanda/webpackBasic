const {resolve} = require("path");
const HtmlWebpackPlugin = require("html-webpack-plugin");
const ESlintWebpackPlugin = require("eslint-webpack-plugin");

module.exports = {
    entry: "./src/index.js",
    output: {
        filename: "built.js",
        path: resolve(__dirname,"build")
    },
    module: {
        rules: [
            /**
             * 语法检查 eslint-loader已被官方弃用，现5在使用 eslint-webpack-plugin 插件
             * 注意： 只检查自己写的源代码，不检查第三方的库
             * 设置检查规则
             */
            // {
            //     test: /\.js$/,
            //     exclude: /node_modules/,
            //     loader: "eslint-loader",
            // }
        ]
    },
    plugins: [
        new HtmlWebpackPlugin({
            template: "./src/index.html"
        }),
        // 设置检查规则:
        // package.json 中 eslintconfig 中设置~
        // "eslintConfig": {
        //     "extends": "airbnb-base"
        // }
        // airbnb --> eslint-config-airbnb-base eslint-plugin-import eslint

        new ESlintWebpackPlugin({
            // 注意： 只检查自己写的源代码，不检查第三方的库
            // 设置要检查的文件
            extensions: ['js', 'json'],
            // 设置不要检查的文件
            exclude: '/node_modules/'
        })
    ],
    mode: "development"
}