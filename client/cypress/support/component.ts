// ***********************************************************
// This example support/component.ts is processed and
// loaded automatically before your test files.
//
// This is a great place to put global configuration and
// behavior that modifies Cypress.
//
// You can change the location of this file or turn off
// automatically serving support files with the
// 'supportFile' configuration option.
//
// You can read more here:
// https://on.cypress.io/configuration
// ***********************************************************

import { mount } from 'cypress/vue';
import { createPinia } from 'pinia';
import '../../src/baseStyles'; // global CSS styles
import './commands';

import type { App } from 'vue';

type Options = {
  global?: {
    plugins?: any[]
    components?: any
  }
  router?: any
}

Cypress.Commands.add('mount', (component, options: Options = {}) => {
  // Setup options object
  options.global = options.global || {}
  // ------------------------------
  // plugins
  // ------------------------------
  options.global.plugins = options.global.plugins || []
  options.global.plugins.push(createPinia())
  // Add router plugin
  options.global.plugins.push({
    install(app: App<Element>) {
      app.use(options.router)
    }
  })
  // ------------------------------
  // Components
  // ------------------------------
  options.global.components = options.global.components || {}
  return mount(component, options).then(({ wrapper }) => {
    return cy.wrap(wrapper).as('vue')
  })
})



Cypress.Commands.add('vue', () => cy.wrap(Cypress.vueWrapper) as any)
