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

  describe ('initial state', () => {
    it('should create a game store', () => {
      const gameStore = useGameStore()
      expect(gameStore).toBeDefined()
    })
    it('should have an initial dealerHand set as empty', () => {
      const gameStore = useGameStore()
      expect(gameStore.dealerHand.score.length).toBe(0)
      expect(gameStore.dealerHand.cards.length).toBe(0)
      expect(gameStore.dealerHand.finished).toBe(false)
    })
    it('should have an initial playerHand set as empty', () => {
      const gameStore = useGameStore()
      expect(gameStore.playerHand.score.length).toBe(0)
      expect(gameStore.playerHand.cards.length).toBe(0)
      expect(gameStore.playerHand.finished).toBe(false)
    })
    it('should have an initial gameState set as "init"', () => {
      const gameStore = useGameStore()
      expect(gameStore.gameState).toBe('init')
    })
    it('should have an initial userMessage set as ""', () => {
      const gameStore = useGameStore()
      expect(gameStore.userMessage).toBe('')
    })
  })
  describe('on store change', () => {
      it('should update the gameState to "init" when dealerHand and playerHand are empty', () => {
        const gameStore = useGameStore()
        expect(gameStore.gameState).toBe('init')
      })
      it('should update the gameState to "playerTurn" when playerHand is not finished and there are cards on the table', () => {
        const gameStore = useGameStore()
        gameStore.$patch({dealerHand:{cards: ['C-4', 'D-7']},playerHand:{cards: ['S-A', 'H-K']}})
        expect(gameStore.gameState).toBe('playerTurn')
      })
      it('should update the gameState to "dealerTurn" when playerHand is finished', () => {
        const gameStore = useGameStore()
        gameStore.$patch({dealerHand:{cards: ['C-4', 'D-7']},playerHand:{cards: ['S-A', 'H-K']}})
        gameStore.$patch({playerHand: {finished: true}})
        expect(gameStore.gameState).toBe('dealerTurn')
      })
      it('should update the gameState to "finished" when playerHand and dealerHand are finished', () => {
        const gameStore = useGameStore()
        gameStore.$patch({dealerHand:{cards: ['C-4', 'D-7', 'H-7']},playerHand:{cards: ['S-A', 'H-K']}})
        gameStore.$patch({playerHand: {finished: true}})
        gameStore.$patch({dealerHand: {finished: true}})
        expect(gameStore.gameState).toBe('finished')
      })

  });








})
