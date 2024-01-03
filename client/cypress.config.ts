import { defineConfig } from 'cypress';
import getCompareSnapshotsPlugin from 'cypress-visual-regression/dist/plugin';

export default defineConfig({
  screenshotsFolder: './cypress/snapshots/actual',
  trashAssetsBeforeRuns: true,
  video: false,
  env: {
    type: 'actual',
  },
  viewportHeight: 1080,
  viewportWidth: 1920,
  e2e: {
    specPattern: 'cypress/e2e/**/*.{cy,spec}.{js,jsx,ts,tsx}',
    baseUrl: 'http://localhost:4173',
    setupNodeEvents(on, config) {
      getCompareSnapshotsPlugin(on, config);
      on('before:browser:launch', (browser, launchOptions) => {
        if (browser.family === 'chromium' && browser.name !== 'electron') {
          launchOptions.args.push('--force-color-profile=srgb')
          launchOptions.args.push('--font-render-hinting=none')
          launchOptions.args.push('--window-size=1920,1080')
          launchOptions.args.push('--force-device-scale-factor=1')
        }
      })
    },
  },
  component: {
    devServer: {
      framework: 'vue',
      bundler: 'vite'
    },
    specPattern: 'src/**/*.cy.ts',
    setupNodeEvents(on, config) {
      getCompareSnapshotsPlugin(on, config);
      on('before:browser:launch', (browser, launchOptions) => {
        if (browser.family === 'chromium' && browser.name !== 'electron') {
          launchOptions.args.push('--force-color-profile=srgb')
          launchOptions.args.push('--font-render-hinting=none')
          launchOptions.args.push('--window-size=1920,1080')
          launchOptions.args.push('--force-device-scale-factor=1')
        }
      })
    },
  }
})


