const path = require('path');
const { merge } = require('webpack-merge');
const base = require('./webpack.base.js');
const ReactRefreshWebpackPlugin = require('@pmmmwh/react-refresh-webpack-plugin');

module.exports = merge(base, {
  mode: 'development', // development:开发环境,内存打包  production:生产环境，硬盘打包
  devtool: 'eval-cheap-module-source-map', // 生成map文件，方便调试
  devServer: {
    open: false, // 自动打开浏览器
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