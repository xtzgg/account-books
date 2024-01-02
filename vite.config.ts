import { fileURLToPath, URL } from 'node:url'

import { defineConfig } from 'vite'
import vue from '@vitejs/plugin-vue'
import vueJsx from '@vitejs/plugin-vue-jsx'
import AutoImport from 'unplugin-auto-import/vite'
import Components from 'unplugin-vue-components/vite'
import { ElementPlusResolver } from 'unplugin-vue-components/resolvers'

// https://vitejs.dev/config/
export default defineConfig({
  server: {
    host: '0.0.0.0',
    port: 5174
    ,
    // 允许所有address访问
    open: true,
    cors: true,
    // 设置代理
    proxy: {
      // with options
      '/api': {
        // target: 'http://accoutbook.natapp1.cc/api',
        target: 'http://localhost:8888',
        changeOrigin: true,
        rewrite: path => path.replace(/^\/api/, '')
      }
    }
  },
  // 配置了第三方插件axios
  optimizeDeps: {
    include: [
      "axios"
    ]
  },
  plugins: [
    vue(),
    vueJsx()
    ,
    AutoImport({
      resolvers: [ElementPlusResolver()],
    }),
    Components({
      resolvers: [ElementPlusResolver()],
    }),
  ],
  resolve: {
    alias: {
      '@': fileURLToPath(new URL('./src', import.meta.url))
    }
  },
  css: {
    // css预处理器
    preprocessorOptions: {
      scss: {
        // 引入 globalstyle.scss 这样就可以在全局中使用 globalstyle.scss中预定义的变量了
        // 给导入的路径最后加上 ; 
        additionalData: '@import "@/assets/style/globalstyle.scss";'
      }
    }
  },
  build: {
    chunkSizeWarningLimit: 1500,
    // rollupOptions: {
    //     output:{
    //         manualChunks(id) {
    //           if (id.includes('node_modules')) {
    //               return id.toString().split('node_modules/')[1].split('/')[0].toString();
    //           }
    //       }
    //     }
    // }
  }
})
