import BJButton from './BJButton.vue'

describe('<BJButton />', () => {
  it('mounts', () => {
    // see: https://on.cypress.io/mounting-vue
    cy.mount(BJButton)
  })
})
