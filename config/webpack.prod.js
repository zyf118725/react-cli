const path = require('path');
const { merge } = require('webpack-merge');
const base = require('./webpack.base.js');
const MiniCssExtractPlugin = require('mini-css-extract-plugin');
const CssMinimizerPlugin = require('css-minimizer-webpack-plugin');
const TerserPlugin = require('terser-webpack-plugin');
const CompressionPlugin = require('compression-webpack-plugin');
const CopyPlugin = require('copy-webpack-plugin');

module.exports = merge(base, {
  mode: 'production',
  devtool: 'source-map',
  plugins: [
    // 复制文件
    new CopyPlugin({
      patterns: [
        {
          from: path.resolve(__dirname, '../public'), // 复制public下文件
          to: path.resolve(__dirname, '../dist'), // 复制到dist目录中
          filter: source => !source.includes('index.html') // 忽略index.html
        },
      ],
    }),
    // 1.引入MiniCssExtractPlugin
    new MiniCssExtractPlugin({
      filename: 'css/[name].[contenthash:8].css',
    }),
    // 开启gzip压缩
    new CompressionPlugin({
      test: /.(js|css)$/, // 只生成css,js压缩文件
      filename: '[path][base].gz', // 文件命名
      algorithm: 'gzip', // 压缩格式,默认是gzip
      threshold: 10240, // 只有大小大于该值的资源会被处理。默认值是 10k
      minRatio: 0.8 // 压缩率,默认值是 0.8
    }),
  ],
  module: {
    rules: [
      // 2. 使用 MiniCssExtractPlugin.loader代替 style-loader
      // { test: /\.(css|less)$/, use: [MiniCssExtractPlugin.loader, 'css-loader', 'less-loader'] },
      { test: /\.(css|less)$/, exclude: /\.module\.less$/, use: [MiniCssExtractPlugin.loader, 'css-loader', 'postcss-loader', 'less-loader'] },
    ]
  },
  optimization: {
    minimizer: [
      // 压缩css
      new CssMinimizerPlugin(),
      // 压缩js
      new TerserPlugin({
        parallel: true, // 开启多线程压缩
        terserOptions: {
          compress: {
            // pure_funcs: ["console.log"] // 删除console.log
          }
        }
      }),
    ],
    splitChunks: { // 分隔代码
      chunks: 'all',
      minSize: 10, // 提取代码体积大于0就提取出来
      cacheGroups: {
        vendors: { // 提取node_modules代码
          name: 'vendors', // 名称.hash.js
          test: /[\\/]node_modules[\\/]/,  // 只匹配node_modules里面的模块
          minChunks: 1, // 只要使用一次就提取出来
          priority: -10, // 注意优先级,如果过高下边不生效
          reuseExistingChunk: true,
        },
        commons: { // 提取页面公共代码
          name: 'commons', // 提取文件命名为commons
          minChunks: 2, // 只要使用两次就提取出来
          priority: -20, // 注意优先级,如果过高下边不生效
          reuseExistingChunk: true,
        },
        react: {
          test: /[\\/]node_modules[\\/](react|react-dom)/,
          name: 'react',
          reuseExistingChunk: true,
        },
        antd: {
          name: 'antd',
          test: /[\\/]node_modules[\\/](antd)/,
          reuseExistingChunk: true,
        },
        antpro: {
          name: 'antpro',
          test: /[\\/]node_modules[\\/](@ant-design)/,
          reuseExistingChunk: true,
        },
        lodash: {
          name: 'lodash',
          test: /[\\/]node_modules[\\/](lodash-es)/,
        },
      }
    }
  },
});