import type { ComponentProps } from '@/types/utils'
import BJCard from './BJCard.vue'

const buttonWithProps = (props?: Partial<ComponentProps<typeof BJCard>>) =>
  cy.mount(BJCard, {
    props: {
      value: 'H-A',
      ...props,
    },
  })

describe('<BJCard />', () => {
  it('Should mount a BJ Card hearts', () => {
    cy.get('body').invoke('addClass', 'playingCards faceImages')
    buttonWithProps()
    cy.get('@vue').should('exist')
    cy.get('.bj-card').compareSnapshot("BJCard hart")
  })
  it('Should mount a BJ Card Spades', () => {
    cy.get('body').invoke('addClass', 'playingCards faceImages')
    buttonWithProps({ value: 'S-J' })
    cy.get('.bj-card').should('exist')
    cy.compareSnapshot("BJCard spades")
  })
  it('Should mount a BJ Card hart diams', () => {
    cy.get('body').invoke('addClass', 'playingCards faceImages')
    buttonWithProps({ value: 'D-10' })
    cy.get('@vue').should('exist')
    cy.get('.bj-card').compareSnapshot("BJCard diams")
  })
  it('Should mount a BJ Card clubs', () => {
    cy.get('body').invoke('addClass', 'playingCards faceImages')
    buttonWithProps({ value: 'C-K' })
    cy.get('@vue').should('exist')
    cy.get('.bj-card').compareSnapshot("BJCard clubs")
  })
})





