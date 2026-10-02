import react from '@vitejs/plugin-react'
import { defineConfig, loadEnv } from 'vite'
import path from 'node:path'
import process from 'node:process'

// https://vite.dev/config/
export default defineConfig(({ mode }) => {
  const env = loadEnv(mode, process.cwd(), '')
  return {
    plugins: [react()],
    resolve: {
      alias: { '@': path.resolve(import.meta.dirname, 'src') },
    },
    server: {
      port: 3000,
      proxy: {
        // 拦截所有以 /api 开头的请求
        '/api': {
          // 目标指向 json-server 的地址
          target: env.VITE_API_BASE_URL || 'http://localhost:3001',
          // 允许跨域
          changeOrigin: true,
          // 路径重写：把 /api 替换为空字符串
          rewrite: (path) => path.replace(/^\/api/, ''),
        },
      },
      // 自动打开浏览器
      open: true,
    },
  }
})
