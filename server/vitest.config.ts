import { fileURLToPath, URL } from 'node:url'
import { defineConfig } from 'vitest/config'


export default defineConfig({
  resolve: {
    alias: {
      '@': fileURLToPath(new URL('./src', import.meta.url)),
      '@@': fileURLToPath(new URL('../types', import.meta.url))
    }
  },
  test: {
    root: fileURLToPath(new URL('./', import.meta.url)),
    coverage: {
      exclude: [
        '**/node_modules/**',
        'env.d.ts',
        'src/app.ts'
      ],
      enabled: true,
      provider: 'v8',
      reporter: ['text', 'json', 'html'],
    },
  }
})

