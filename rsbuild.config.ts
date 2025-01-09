import { defineConfig, loadEnv } from '@rsbuild/core';
import { pluginReact } from '@rsbuild/plugin-react';
import { pluginLess } from '@rsbuild/plugin-less';

const { publicVars } = loadEnv({ prefixes: ['REACT_APP_'] });

export default defineConfig({
  plugins: [
    pluginReact(),
    pluginLess()
  ],
  server: {
    port: 3344,
    proxy: {
      '/api': {
        target: 'http://a.itying.com',
        pathRewrite: { '^/api': '' },
      },
    },
  },
  source: {
    define: publicVars,
  },
});