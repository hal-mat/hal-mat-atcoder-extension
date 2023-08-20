/*
import { defineConfig } from 'vite'
import vue from '@vitejs/plugin-vue'

export default defineConfig({
  plugins: [vue()],
})
*/

// https://vitejs.dev/config/
import { defineConfig } from 'vite'
import vue from '@vitejs/plugin-vue'
import { crx } from '@crxjs/vite-plugin'
import manifest from './manifest.json' assert { type: 'json' }

export default defineConfig({
  plugins: [
    vue(),
    crx({ manifest }),
  ],
})