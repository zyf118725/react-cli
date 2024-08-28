const HtmlWebpackPlugin = require('html-webpack-plugin');
const WebpackBar = require('webpackbar');
const path = require('path');
const { ProvidePlugin, DefinePlugin } = require('webpack');
const { BundleAnalyzerPlugin } = require('webpack-bundle-analyzer');
const Dotenv = require('dotenv-webpack');

module.exports = {
  entry: path.resolve(__dirname, '../', 'src/index.tsx'),
  output: {
    path: path.resolve(__dirname, '../', 'dist'), // 打包后的文件存放的位置, 必须是绝对路径
    filename: 'js/[name].[chunkhash:8].js', // [name]格式化字符串，之前是啥名，现在还是啥名  2.[chunkhash:8]指定hash值,解决缓存问题
    clean: true, // 每次打包前清空dist目录
    publicPath: '/',  // 资源引用路径，若不配置，刷新页面，页面空白 如:/goods/detail ->/goods/js/main.js,找不到资源
  },
  plugins: [
    new HtmlWebpackPlugin({
      template: path.resolve(__dirname, '../', 'public/index.html'), // 指定template后div里的东西不会被删除
      inject: true, // 自动注入静态资源, 2可指定js插入位置，如body前
      title: 'react-webpack', // 设置页面title
      // favicon: path.resolve(__dirname, '../', 'public/favicon.ico'), // 设置页面图标
      // filename: 'aaa.html', // 打包后的文件名, 默认index.html
    }),
    new WebpackBar({
      color: "#85d", // 默认green，进度条颜色支持HEX
      basic: false, // 默认true，启用一个简单的日志报告器
      profile: false, // 默认false，启用探查器。
    }),
    new ProvidePlugin({
      React: path.resolve(__dirname, '../', 'node_modules/react/index.js'),
    }),
    // 区分环境1
    // new DefinePlugin({ 'process.env.NODE_ENV': JSON.stringify(process.env.NODE_ENV) }),
    // 区分环境2-使用env文件
    new Dotenv({ path: path.resolve(__dirname, '..', `.env.${process.env.NODE_ENV}`) }),
    // 分析打包体积
    // new BundleAnalyzerPlugin({}),
  ],
  // 配置babel（加载器）， 在webpack处理某些模块前，先试用loader处理
  // 当loader处理完之后，还需要使用一些@babel/* 进行语法转化。
  module: {
    rules: [
      {
        test: /\.(ts|tsx|js|jsx)$/, use: ['thread-loader', 'babel-loader'],
        include: [path.resolve(__dirname, '../src')]
      },
      {
        test: /\.(css|less)$/,
        use: [
          'style-loader',
          {
            loader: 'css-loader',
            options: {
              modules: {
                auto: true,
                localIdentName: '[local]-[hash:base64:5]'
              }
            },
          },
          'postcss-loader', 'less-loader',
        ],
        include: [path.resolve(__dirname, '../src')]
        // sideEffects: true,
      },
      {
        test: /\.(png|jpg|jpeg|gif|svg|webp)$/,
        type: 'asset',
        // type: 'asset/resource',
        // 小于10kb转base64位
        parser: { dataUrlCondition: { maxSize: 1 * 1024 } },
        generator: { filename: 'img/[name].[contenthash:8][ext]' }
      },
      {
        test: /.(woff2?|eot|ttf|otf)$/, // 匹配字体文件
        generator: {
          filename: 'static/fonts/[name].[contenthash:8][ext]', // 加上[contenthash:8]
        },
      },
      {
        test: /.(mp4|webm|ogg|mp3|wav|flac|aac)$/, // 匹配媒体文件
        generator: {
          filename: 'static/media/[name].[contenthash:8][ext]', // 加上[contenthash:8]
        },
      },
    ]
  },
  resolve: {
    alias: {
      '@': path.resolve(__dirname, '../', 'src'),
    },
    extensions: ['.js', '.jsx', '.ts', '.tsx', '.json'] // 解析模块时，可以省略的扩展名
  },
  // 使用文件缓存
  cache: { type: 'filesystem' }
};