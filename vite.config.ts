import { defineConfig } from 'vite';
import tailwindcss from '@tailwindcss/vite';

// Vite 설정 파일에 server.hmr 추가
export default defineConfig({
  plugins: [tailwindcss()],
  server: {
    hmr: {
      protocol: 'ws', // WebSocket 사용
      host: 'localhost', // 호스트를 localhost로 설정
      port: 5173, // Vite 개발 서버의 포트 번호
    },
  },
});
