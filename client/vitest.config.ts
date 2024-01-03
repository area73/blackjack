import { fileURLToPath } from 'node:url'
import { configDefaults, defineConfig, mergeConfig } from 'vitest/config'
import viteConfig from './vite.config'

export default mergeConfig(
  viteConfig,
  defineConfig({

    test: {
      environment: 'jsdom',
      exclude: [...configDefaults.exclude, 'e2e/*'],
      root: fileURLToPath(new URL('./', import.meta.url)),
      coverage: {
        exclude: [
          '**/node_modules/**',
          'src/components/**',
          'src/view/**',
          '*.cjs',
          '*.d.ts',
          'public/**',
          'src/mocks/**',
          'src/main.ts',
          'src/baseStyles.ts',
          'src/types/**',
          'src/lang/**',
          'src/utils/const.ts'
        ],
        enabled: true,
        provider: 'v8',
        reporter: ['text', 'json', 'html'],
      },
    }
  })
)
