import { defineConfig } from 'vite'
import vue from '@vitejs/plugin-vue'
import tailwindcss from '@tailwindcss/vite'

// https://vite.dev/config/
export default defineConfig({
  plugins: [vue(), tailwindcss()],
  server: {
    host: '0.0.0.0', // 关键：监听所有网络接口（而非仅 localhost）
    port: 5175,       // 端口可自定义（如 8080，注意避开系统占用端口）
  }
})
