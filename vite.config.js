import { defineConfig } from 'vite';
import { resolve } from 'path';

export default defineConfig({
  build: {
    rollupOptions: {
      input: {
        main: resolve(__dirname, 'index.html'),
        experience: resolve(__dirname, 'experience.html'),
        results: resolve(__dirname, 'results.html'),
        book: resolve(__dirname, 'book.html'),
      },
    },
  },
  server: {
    port: 5174,
  },
});
