import { STATUS_CODES } from '@@/shared'
import { createPinia, setActivePinia } from 'pinia'
import { beforeEach, describe, expect, it } from 'vitest'
import { useGameStore } from './game'

describe('game Store', () => {
  beforeEach(() => {
    // creates a fresh pinia and makes it active
    // so it's automatically picked up by any useStore() call
    // without having to pass it to it: `useStore(pinia)`
    setActivePinia(createPinia())
  })

  describe('initial state', () => {
    it('should create a game store', () => {
      const gameStore = useGameStore()
      expect(gameStore).toBeDefined()
    })
    it('should have an initial dealerHand set as empty', () => {
      const gameStore = useGameStore()
      expect(gameStore.dealerHand.score.length).toBe(0)
      expect(gameStore.dealerHand.cards.length).toBe(0)
      expect(gameStore.dealerHand.state).toBe('not-started')
    })
    it('should have an initial playerHand set as empty', () => {
      const gameStore = useGameStore()
      expect(gameStore.playerHand.score.length).toBe(0)
      expect(gameStore.playerHand.cards.length).toBe(0)
      expect(gameStore.playerHand.state).toBe('not-started')
    })
    it('should have an initial gameState set as "init"', () => {
      const gameStore = useGameStore()
      expect(gameStore.userMessage.code).toBe(STATUS_CODES.INIT)
    })
    it('should have an initial userMessage', () => {
      const gameStore = useGameStore()
      expect(gameStore.userMessage).toStrictEqual({
        code: STATUS_CODES.INIT,
        message: "game not started",
      })
    })
  })
  /*
  describe('on store change', () => {
    it('should update the gameState to "init" when dealerHand and playerHand are empty', () => {
      const gameStore = useGameStore()
      expect(gameStore.userMessage.code).toBe(STATUS_CODES.INIT)
    })
    it('should update the gameState to "playerTurn" when playerHand is not finished and there are cards on the table', () => {
      const gameStore = useGameStore()
      gameStore.$patch({ dealerHand: { cards: ['C-4', 'D-7'], score: [11] }, playerHand: { cards: ['S-A', 'H-K'], score: [11, 21] } })
      expect(gameStore.userMessage.code).toBe(STATUS_CODES.USER_PLAYING)
    })
    it('should update the gameState to "dealerTurn" when playerHand is finished', () => {
      const gameStore = useGameStore()
      gameStore.$patch({ dealerHand: { cards: ['C-4', 'D-7'] }, playerHand: { cards: ['S-A', 'H-K'] } })
      gameStore.$patch({ playerHand: { state: 'stand' } })
      expect(gameStore.userMessage.code).toBe(STATUS_CODES.DEALER_PLAYING)
    })
    it('should update the gameState to "finished" when playerHand and dealerHand are finished', () => {
      const gameStore = useGameStore()
      gameStore.$patch({ dealerHand: { cards: ['C-4', 'D-7', 'H-7'] }, playerHand: { cards: ['S-A', 'H-K'] } })
      gameStore.$patch({ playerHand: { state: 'stand' } })
      gameStore.$patch({ dealerHand: { state: 'busted' } })
      expect(gameStore.userMessage.code).toBe(STATUS_CODES.USER_WIN)
    })
  })
  */
})
