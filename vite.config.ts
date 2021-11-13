import { defineConfig } from 'vite';
import vue from '@vitejs/plugin-vue';
import vueJsx from '@vitejs/plugin-vue-jsx';
import { visualizer } from 'rollup-plugin-visualizer';

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [
    vue(),
    vueJsx({
      // options are passed on to @vue/babel-plugin-jsx
    }),
    visualizer()
  ],
  build: {
    rollupOptions: {
      output: {
        manualChunks: {
          'vue': ['vue', 'vuex', 'vue-router'],
          'utils': ['dayjs', 'marked']
        }
      }
    }
  }
});
