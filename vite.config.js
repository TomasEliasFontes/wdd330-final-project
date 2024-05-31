import { resolve } from 'path';
import { defineConfig } from 'vite';

export default defineConfig({
  root: 'src/',

  build: {
    outDir: '../dist',
    rollupOptions: {
      input: {
        main: resolve(__dirname, 'src/index.html'),
        cart: resolve(__dirname, 'src/breeds/breed.html'),
        checkout: resolve(__dirname, "src/dogDetails/dogDetail.html"),
        product: resolve(__dirname, 'src/favorites/favorite.html'),
        listing: resolve(__dirname, "src/join/join.html"),  
      },
    },
  },
});