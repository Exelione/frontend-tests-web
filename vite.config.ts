import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';
import path from 'node:path';

export default defineConfig({
  plugins: [react()],
  resolve: {
    alias: {
      '@': path.resolve(__dirname, './src'),
      '@app': path.resolve(__dirname, './src/app'),
      '@shared': path.resolve(__dirname, './src/shared'),
      '@widgets': path.resolve(__dirname, './src/widgets'),
      '@features': path.resolve(__dirname, './src/features'),
      '@entities': path.resolve(__dirname, './src/entities'),
      '@pages': path.resolve(__dirname, './src/pages'),
    },
  },
  css: {
    preprocessorOptions: {
      scss: {
        additionalData: (content: string, filename: string) => {
          // Не добавляем в сами файлы стилей (избегаем циклов)
          if (filename.includes('src/app/styles/')) {
            return content;
          }
          return `@use "@app/styles/variables" as *; @use "@app/styles/mixins" as *;\n${content}`;
        },
      },
    },
  },
});