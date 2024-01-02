

describe('Game Flows', () => {
  describe('Initial view', () => {
    it('visits the app root url', () => {
      cy.visit('/')
      cy.findByRole('status').should('exist')
      // dealer hand
      cy.findAllByRole('list').filter("[name = 'dealer']").should('exist')
      cy.findAllByRole('list').filter("[name = 'dealer']").findAllByRole('listitem').should('have.length', 0)
      cy.findByTestId('dealer-score').should('contain.text', '0')
      // user hand
      cy.findAllByRole('list').filter("[name = 'user']").should('exist')
      cy.findAllByRole('list').filter("[name = 'user']").findAllByRole('listitem').should('have.length', 0)
      cy.findByTestId('user-score').should('contain.text', '0')
      // buttons
      cy.findByRole('button', { name: 'Hit' }).should('exist')
      cy.findByRole('button', { name: 'Hit' }).should('be.disabled')
      cy.findByRole('button', { name: 'Stand' }).should('exist')
      cy.findByRole('button', { name: 'Stand' }).should('be.disabled')
      cy.findByRole('button', { name: 'New Game' }).should('exist')
      cy.findByRole('button', { name: 'New Game' }).should('be.enabled')
    })
  })
  describe('When New game started', () => {
    it('gets a new game', () => {
      cy.visit('/?flow=newGame')
      cy.findByRole('button', { name: 'New Game' }).click()

      cy.findByRole('status').should('contain.text', 'Your turn')
      // dealer hand
      cy.findAllByRole('list').filter("[name = 'dealer']").findAllByRole('listitem').should('have.length', 2)
      cy.findAllByRole('list').filter("[name = 'dealer']").findAllByRole('listitem').filter("[name = '*']").should('exist')
      cy.findAllByRole('list').filter("[name = 'dealer']").findAllByRole('listitem').filter("[name = 'H-7']").should('exist')
      cy.findByTestId('dealer-score').should('contain.text', '7')
      // user hand
      cy.findAllByRole('list').filter("[name = 'user']").findAllByRole('listitem').should('have.length', 2)
      cy.findAllByRole('list').filter("[name = 'user']").findAllByRole('listitem').filter("[name = 'H-8']").should('exist')
      cy.findAllByRole('list').filter("[name = 'user']").findAllByRole('listitem').filter("[name = 'D-J']").should('exist')
      cy.findByTestId('user-score').should('contain.text', '18')
      // buttons
      cy.findByRole('button', { name: 'Hit' }).should('be.enabled')
      cy.findByRole('button', { name: 'Stand' }).should('be.enabled')
      cy.findByRole('button', { name: 'New Game' }).should('be.disabled')
    })
  })
  describe('When user\'s turn', () => {
    it('adds a card to user hand and user is not busted', () => {
      cy.visit('/?flow=newGame')
      cy.findByRole('button', { name: 'New Game' }).click()
      cy.findByRole('button', { name: 'Hit' }).click()
      cy.findByRole('status').should('contain.text', 'Your turn')
      // dealer hand
      cy.findAllByRole('list').filter("[name = 'dealer']").findAllByRole('listitem').should('have.length', 2)
      cy.findByTestId('dealer-score').should('contain.text', '7')
      // user hand
      cy.findAllByRole('list').filter("[name = 'user']").findAllByRole('listitem').should('have.length', 3)
      cy.findAllByRole('list').filter("[name = 'user']").findAllByRole('listitem').filter("[name = 'D-2']").should('exist')
      cy.findByTestId('user-score').should('contain.text', '20')
      // buttons
      cy.findByRole('button', { name: 'Hit' }).should('be.enabled')
      cy.findByRole('button', { name: 'Stand' }).should('be.enabled')
      cy.findByRole('button', { name: 'New Game' }).should('be.disabled')
    })
    it('adds a card to user hand and user gets busted', () => {
      cy.visit('/?flow=newGame')
      cy.findByRole('button', { name: 'New Game' }).click()
      cy.findByRole('button', { name: 'Hit' }).click() // D-2
      cy.findByRole('button', { name: 'Hit' }).click() // S-8
      cy.findByRole('status').should('contain.text', 'Dealer wins')
      // dealer hand
      cy.findAllByRole('list').filter("[name = 'dealer']").findAllByRole('listitem').should('have.length', 2)
      cy.findByTestId('dealer-score').should('contain.text', '7')
      // user hand
      cy.findAllByRole('list').filter("[name = 'user']").findAllByRole('listitem').should('have.length', 4)
      cy.findAllByRole('list').filter("[name = 'user']").findAllByRole('listitem').filter("[name = 'S-8']").should('exist')
      cy.findByTestId('user-score').should('contain.text', '28')
      // buttons
      cy.findByRole('button', { name: 'Hit' }).should('be.disabled')
      cy.findByRole('button', { name: 'Stand' }).should('be.disabled')
      cy.findByRole('button', { name: 'New Game' }).should('be.enabled')
    })
    it('user stand, dealer plays got busted and user wins', () => {
      cy.visit('/?flow=newGame')
      cy.findByRole('button', { name: 'New Game' }).click()
      cy.findByRole('button', { name: 'Hit' }).click() // D-2
      cy.findByRole('button', { name: 'Stand' }).click()
      cy.findByRole('status').should('contain.text', 'You win')
      // dealer hand
      cy.findAllByRole('list').filter("[name = 'dealer']").findAllByRole('listitem').should('have.length', 3)
      cy.findByTestId('dealer-score').should('contain.text', '25')
      // user hand
      cy.findAllByRole('list').filter("[name = 'user']").findAllByRole('listitem').should('have.length', 3)
      cy.findByTestId('user-score').should('contain.text', '20')
      // buttons
      cy.findByRole('button', { name: 'Hit' }).should('be.disabled')
      cy.findByRole('button', { name: 'Stand' }).should('be.disabled')
      cy.findByRole('button', { name: 'New Game' }).should('be.enabled')
    })
    it('user stand, dealer play and wins', () => {
      cy.visit('/?flow=newGameDealer')
      cy.findByRole('button', { name: 'New Game' }).click()
      cy.findByRole('button', { name: 'Stand' }).click()
      cy.findByRole('status').should('contain.text', 'Dealer wins')
      // dealer hand
      cy.findAllByRole('list').filter("[name = 'dealer']").findAllByRole('listitem').should('have.length', 3)
      cy.findByTestId('dealer-score').should('contain.text', '21')
      // user hand
      cy.findAllByRole('list').filter("[name = 'user']").findAllByRole('listitem').should('have.length', 2)
      cy.findByTestId('user-score').should('contain.text', '18')
      // buttons
      cy.findByRole('button', { name: 'Hit' }).should('be.disabled')
      cy.findByRole('button', { name: 'Stand' }).should('be.disabled')
      cy.findByRole('button', { name: 'New Game' }).should('be.enabled')
    })
    it('user got an Ace and split values', () => {
      cy.visit('/?flow=newGameAces')
      cy.findByRole('button', { name: 'New Game' }).click()
      cy.findByRole('button', { name: 'Stand' }).click()
      cy.findByRole('status').should('contain.text', 'Your turn')
      // dealer hand
      cy.findAllByRole('list').filter("[name = 'dealer']").findAllByRole('listitem').should('have.length', 2)
      cy.findByTestId('dealer-score').should('contain.text', '7')
      // user hand
      cy.findAllByRole('list').filter("[name = 'user']").findAllByRole('listitem').should('have.length', 2)
      cy.findByTestId('user-score').should('contain.text', '6 / 16')
      // buttons
      cy.findByRole('button', { name: 'Hit' }).should('be.enabled')
      cy.findByRole('button', { name: 'Stand' }).should('be.enabled')
      cy.findByRole('button', { name: 'New Game' }).should('be.disabled')
    })
    it('user got an Ace, hit and bust one value', () => {
      cy.visit('/?flow=newGameAces')
      cy.findByRole('button', { name: 'New Game' }).click()
      cy.findByRole('button', { name: 'Hit' }).click()
      cy.findByRole('status').should('contain.text', 'Your turn')
      // dealer hand
      cy.findAllByRole('list').filter("[name = 'dealer']").findAllByRole('listitem').should('have.length', 2)
      cy.findByTestId('dealer-score').should('contain.text', '7')
      // user hand
      cy.findAllByRole('list').filter("[name = 'user']").findAllByRole('listitem').should('have.length', 3)
      cy.findByTestId('user-score').should('contain.text', '14')
      // buttons
      cy.findByRole('button', { name: 'Hit' }).should('be.enabled')
      cy.findByRole('button', { name: 'Stand' }).should('be.enabled')
      cy.findByRole('button', { name: 'New Game' }).should('be.disabled')
    })
    it('user got a Black Jack', () => {
      cy.visit('/?flow=newGameBlackJack')
      cy.findByRole('button', { name: 'New Game' }).click()
      cy.findByRole('status').should('contain.text', 'Black Jack !')
      // dealer hand
      cy.findAllByRole('list').filter("[name = 'dealer']").findAllByRole('listitem').should('have.length', 2)
      cy.findByTestId('dealer-score').should('contain.text', '7')
      // user hand
      cy.findAllByRole('list').filter("[name = 'user']").findAllByRole('listitem').should('have.length', 2)
      cy.findByTestId('user-score').should('contain.text', '21')
      // buttons
      cy.findByRole('button', { name: 'Hit' }).should('be.disabled')
      cy.findByRole('button', { name: 'Stand' }).should('be.disabled')
      cy.findByRole('button', { name: 'New Game' }).should('be.enabled')
    })
  })

})
