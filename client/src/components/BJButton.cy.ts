import type { ComponentProps } from '@/types/utils'
import BJButton from './BJButton.vue'

const buttonWithProps = (props?: Partial<ComponentProps<typeof BJButton>>) =>
  cy.mount(BJButton, {
    props: {
      label: 'button',
      disabled: false,
      onClick: cy.spy().as('onClick'),
      ...props,
    },
  })


describe('<BJButton />', () => {

  it('Should mount a BJ button', () => {
    buttonWithProps()
    cy.get('button').should('exist')
    // compare a screenshot of a standard button
    cy.get('button').compareSnapshot("BJButton")
  })

  it('Should contain a text passed as a prop', () => {
    const name = 'the name to display'
    buttonWithProps({ label: name })
    cy.get('button').contains(name)
    // compare a screenshot of a large name button
    cy.get('button').compareSnapshot("BJButton-long-name")
  })

  it('Should execute a given function  when clicked', () => {
    buttonWithProps()
    cy.get('button').click().then(() => {
      cy.get('@onClick').should('have.been.called')
    })
    // cy.get('@onClick').should('have.been.called')
  })

  describe('When button changes state', () => {
    it('Should disable button on disabled', () => {
      buttonWithProps({ disabled: true })
      cy.get('button').should('be.disabled')
      cy.get('button').should('have.css', 'cursor', 'not-allowed')
      // We want to visually compare the disabled state of the button
      cy.get('button').compareSnapshot("BJButton-disabled-state")
    })

    it('Should change visual state on hover', () => {
      buttonWithProps()
      cy.get('button').realHover().should('have.css', 'cursor', 'pointer')
      // this will compare  a screenshot of real hover state of the button
      // There is a bug with snapshots because they rely on DOM and cannot capture hover state
      // even though we are using realHover() from cypress-real-events.
      // A workaround is to add a class to the button on hover and compare the snapshot.
      // This class is added in the BJButton.vue file along with the :hover pseudo class
      cy.get('button')
        .realHover()
        .invoke('addClass', 'hover')
        .compareSnapshot("BJButton-hover-state")
    })

    // There is no change in the visual state of the button on focus or click so no need to test it
  })
})




