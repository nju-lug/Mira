import type { PluginOption } from 'vite'
import path from 'node:path'
import VueI18nVitePlugin from '@intlify/unplugin-vue-i18n/vite'
import vue from '@vitejs/plugin-vue'
import vueJsx from '@vitejs/plugin-vue-jsx'
import { visualizer } from 'rollup-plugin-visualizer'
import { defineConfig } from 'vite'

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [
    vue({
      template: {
        compilerOptions: {
          isCustomElement: tag => tag.startsWith('mira-'),
        },
      },
    }),
    VueI18nVitePlugin({
      include: path.resolve(import.meta.dirname, './src/i18n/lang/**'),
    }),
    vueJsx({}),
    visualizer() as PluginOption,
  ],
  resolve: {
    tsconfigPaths: true,
    alias: [
      {
        find: 'vue-i18n',
        replacement: 'vue-i18n/dist/vue-i18n.runtime.esm-bundler.js',
      },
      {
        find: 'vue',
        replacement: 'vue/dist/vue.esm-bundler.js',
      },
    ],
  },
  server: {
    proxy: {
      '/configs': {
        target: 'https://mirrors.nju.edu.cn',
        changeOrigin: true,
        secure: true,
      },
    },
  },
  build: {
    rolldownOptions: {
      output: {
        codeSplitting: {
          groups: [
            { name: 'vue', test: /[\\/]node_modules[\\/](vue|vue-router|vue-gtag|vue-i18n)[\\/]/ },
            { name: 'utils', test: /[\\/]node_modules[\\/](dayjs|marked|lodash-es)[\\/]/ },
          ],
        },
      },
    },
  },
})
