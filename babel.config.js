module.exports = function (api) {
  api.cache(true);
  return {
    presets: [
      '@babel/preset-env',
      '@babel/preset-react',
      '@babel/preset-typescript'
    ],
    plugins: [
      // 处理装饰器语法
      ["@babel/plugin-proposal-decorators", { "version": "legacy" }],
      "@babel/plugin-transform-class-properties",
    ]
  }
};
