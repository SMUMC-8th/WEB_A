import { defineConfig } from 'vite';
import tailwindcss from '@tailwindcss/vite';

// Vite 설정 파일에 server.hmr 추가
export default defineConfig({
  plugins: [tailwindcss()],
  server: {
    hmr: {
      protocol: 'ws',
      host: 'localhost',
      port: 5173,
    },
  },
});
