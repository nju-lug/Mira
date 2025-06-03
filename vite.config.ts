import type { PluginOption } from 'vite'
import path from 'node:path'
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
    vueJsx({}),
    visualizer() as PluginOption,
  ],
  resolve: {
    alias: [
      {
        find: 'vue-i18n',
        replacement: 'vue-i18n/dist/vue-i18n.runtime.esm-bundler.js',
      },
      {
        find: '@',
        replacement: path.resolve(__dirname, './src'),
      },
      {
        find: 'vue',
        replacement: 'vue/dist/vue.esm-bundler.js',
      },
    ],
  },
  build: {
    rollupOptions: {
      output: {
        manualChunks: {
          vue: ['vue', 'vuex', 'vue-router', 'vue-gtag', 'vue-i18n'],
          utils: ['dayjs', 'marked', 'lodash-es'],
        },
      },
    },
  },
})
