# webpack 性能优化
* 开发环境性能优化
* 生产环境性能优化

## 开发环境性能优化
* 优化打包构建速度
    * HMR 热模块替换
* 优化代码调试
    * source-map

## 生产环境性能优化
* 优化打包构建速度
    * babel缓存
    * 多进程打包
    * externals
    * dll
* 优化代码运行的性能
    * 文件缓存（hash-chunkhash-contenthash）
    * tree shaking 
    * code split
    * 懒加载/预加载