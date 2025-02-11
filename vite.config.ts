import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import path from 'path'
import { resolve } from 'path'

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [react()],
  base: '/raf/',
  resolve: {
    alias: {
      '@': path.resolve(__dirname, './src'),
    },
  },
  server: {
    port: 3000,
    strictPort: false,
    open: true,
    host: true,
    cors: true,
    hmr: {
      overlay: true
    },
    proxy: {
      '/api/ai': {
        target: 'http://localhost:3001',
        changeOrigin: true,
        secure: false,
        rewrite: (path) => path.replace(/^\/api\/ai/, ''),
        configure: (proxy, _options) => {
          proxy.on('error', (err, _req, _res) => {
            console.log('proxy error', err);
          });
          proxy.on('proxyReq', (proxyReq, req, _res) => {
            console.log('Sending Request to AI Assistant:', req.method, req.url);
          });
          proxy.on('proxyRes', (proxyRes, req, _res) => {
            console.log('Received Response from AI Assistant:', proxyRes.statusCode, req.url);
          });
        },
      },
      '/api/coingecko': {
        target: 'https://api.coingecko.com/api/v3',
        changeOrigin: true,
        secure: false,
        rewrite: (path) => path.replace(/^\/api\/coingecko/, ''),
        configure: (proxy, _options) => {
          proxy.on('error', (err, _req, _res) => {
            console.log('proxy error', err);
          });
          proxy.on('proxyReq', (proxyReq, req, _res) => {
            console.log('Sending Request to the Target:', req.method, req.url);
          });
          proxy.on('proxyRes', (proxyRes, req, _res) => {
            console.log('Received Response from the Target:', proxyRes.statusCode, req.url);
          });
        },
      },
      '/api/cryptopanic': {
        target: 'https://cryptopanic.com/api/v1',
        changeOrigin: true,
        secure: false,
        rewrite: (path) => path.replace(/^\/api\/cryptopanic/, ''),
        configure: (proxy, _options) => {
          proxy.on('error', (err, _req, _res) => {
            console.log('proxy error', err);
          });
          proxy.on('proxyReq', (proxyReq, req, _res) => {
            console.log('Sending Request to CryptoPanic:', req.method, req.url);
          });
          proxy.on('proxyRes', (proxyRes, req, _res) => {
            console.log('Received Response from CryptoPanic:', proxyRes.statusCode, req.url);
          });
        },
      },
    },
  },
  build: {
    outDir: 'dist',
    sourcemap: process.env.NODE_ENV === 'development',
    rollupOptions: {
      input: {
        main: resolve(__dirname, 'index.html'),
        bot: resolve(__dirname, 'src/bot.ts'),
      },
      output: {
        entryFileNames: (chunkInfo) => {
          return chunkInfo.name === 'bot' ? '[name].js' : 'assets/[name]-[hash].js';
        },
      },
    },
  },
})
