import { defineConfig } from 'vite'
import vue from '@vitejs/plugin-vue'

// base './' faz os caminhos funcionarem também no GitHub Pages
export default defineConfig({ base: './', plugins: [vue()] })
