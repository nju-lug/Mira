import { defineConfig } from 'vite';
import path from 'path';
import vue from '@vitejs/plugin-vue';
import vueJsx from '@vitejs/plugin-vue-jsx';
import vueI18n from '@intlify/vite-plugin-vue-i18n';
import { visualizer } from 'rollup-plugin-visualizer';

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [
    vue(),
    vueJsx({}),
    vueI18n({ include: path.resolve(__dirname, './src/i18n/**') }),
    visualizer()
  ],
  resolve: {
    alias: {
      'vue-i18n': 'vue-i18n/dist/vue-i18n.runtime.esm-bundler.js'
    }
  },
  build: {
    rollupOptions: {
      output: {
        manualChunks: {
          vue: ['vue', 'vuex', 'vue-router', 'vue-gtag', 'vue-i18n'],
          utils: ['dayjs', 'marked']
        }
      }
    }
  }
});
