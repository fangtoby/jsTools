# webpack 命令行的几种基本命令

      $ webpack // 最基本的启动webpack方法
      $ webpack -w // 提供watch方法，实时进行打包更新
      $ webpack -p // 对打包后的文件进行压缩，提供production
      $ webpack -d // 提供source map，方便调试。

#ck.config.js 配置文件，所以只需要输入 webpack 就能运行， webpack 会自动去执行配置文件的内容：

      webpack

#对于大型项目，可能 webpack 会运行很久，所以可以添加一个进度条便于查看：

      webpack --progress --colors

#在 gulp 里，使用 watch 可以监视文件的变化，而在 webpack 里，只需加一个参数：

      webpack --watch

#所以，我们可以使用下面的命令运行：

      webpack --progress --colors --watch运行

