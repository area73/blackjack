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
  it('should reset state', () => {
    const gameStore = useGameStore()
    gameStore.$patch((state) => {
      state.token = '1234'
      state.dealerHand = {
        cards: ['D-A', 'D-2'],
        score: [3, 13],
        state: 'not-started',
      },
        state.playerHand = {
          cards: ['D-7', 'D-10'],
          score: [17],
          state: 'playing',
        },
        state.userMessage = { code: 1000, message: 'player turn patched' };
    })
    expect(gameStore.userMessage).toStrictEqual({
      code: 1000,
      message: "player turn patched",
    })

    gameStore.$reset()

    expect(gameStore.userMessage).toStrictEqual({
      code: STATUS_CODES.INIT,
      message: "game not started",
    })
    expect(gameStore.dealerHand.cards.length).toBe(0)
    expect(gameStore.playerHand.cards.length).toBe(0)
    expect(gameStore.token).toBe('')
  })
})
