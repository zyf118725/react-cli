const path = require('path');
const { merge } = require('webpack-merge');
const base = require('./webpack.base.js');
const ReactRefreshWebpackPlugin = require('@pmmmwh/react-refresh-webpack-plugin');
const portfinder = require('portfinder');

const devConfig = merge(base, {
  mode: 'development', // development:开发环境,内存打包  production:生产环境，硬盘打包
  devtool: 'eval-cheap-module-source-map', // 生成map文件，方便调试
  devServer: {
    open: true, // 自动打开浏览器
    port: 3344,
    hot: true, // 热更新
    historyApiFallback: true, // 解决history路由404问题
    compress: false, // gzip压缩,开发环境不开启，提升热更新速度
    // 处理跨域
    proxy: {
      '/api': {
        target: 'http://a.itying.com',
        changeOrigin: true,
        secure: false,
        pathRewrite: { '^/api': '' },
      },
    },
    static: {
      directory: path.join(__dirname, "../public"), //托管静态资源public文件夹
    },
    client: {
      // 作用：页面上不会黑框提示警告，只在控制台显示
      overlay: { errors: true, warnings: false, },
    },
    headers: { "Access-Control-Allow-Origin": "*" },
  },
  plugins: [
    new ReactRefreshWebpackPlugin(), // react热更新
  ]
});

// 如果端口占用，开新端口
module.exports = new Promise((resolve, reject) => {
  portfinder.basePort = devConfig.devServer.port;
  // 从指定的端口开始查找空闲端口
  portfinder.getPort((err, port) => {
    if (err) {
      reject(err);
      return;
    }
    // 端口占用重设新端口
    devConfig.devServer.port = process.env.PORT = port;
    resolve(devConfig);
  });
});