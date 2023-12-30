/// <reference types="cypress" />
import '@testing-library/cypress/add-commands'
import 'cypress-real-events'
import compareSnapshotCommand from 'cypress-visual-regression/dist/command'


compareSnapshotCommand({
  capture: 'fullPage',
  errorThreshold: 0.1
})

Cypress.Commands.overwrite('compareSnapshot', (originalFn, ...args) => {
  cy.get('body').then(() => {
    // checks for font loading
    cy.document().its('fonts.status').should('equal', 'loaded')
    return originalFn(...args)
  })
})

export { }
