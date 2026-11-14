import react, { reactCompilerPreset } from '@vitejs/plugin-react'
import babel from '@rolldown/plugin-babel'
import { defineConfig } from 'vite'
export default defineConfig({
  base: '/st.-School-Challenge-2-Debounced-User-Search/',
  plugins: [
    react(),
    babel({ presets: [reactCompilerPreset()] })
  ],
})
