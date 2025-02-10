import { defineConfig } from 'vite';
import { resolve } from 'path';

export default defineConfig({
  build: {
    lib: {
      entry: resolve(__dirname, 'src/bot.ts'),
      name: 'bot',
      fileName: 'bot',
      formats: ['es'],
    },
    rollupOptions: {
      external: [
        'grammy',
        'natural',
        'sentiment',
        '@tensorflow/tfjs',
        '@tensorflow/tfjs-node',
        '@tensorflow-models/coco-ssd',
        'tesseract.js',
        'sharp',
        'dotenv',
        'axios'
      ],
    },
  },
}); 