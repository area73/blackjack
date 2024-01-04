import { createPinia, setActivePinia } from 'pinia'
import { beforeEach, describe, expect, it } from 'vitest'
import { useGlobalStateStore } from './globalState'

describe('game Store', () => {
  beforeEach(() => {
    setActivePinia(createPinia())
  })

  it('should create a globalState store', () => {
    const globalStateStore = useGlobalStateStore()
    expect(globalStateStore).toBeDefined()
  })

  it('should have controls\' state ', () => {
    const globalStateStore = useGlobalStateStore()
    expect(globalStateStore.controls.hit).toBeDefined()
    expect(globalStateStore.controls.newGame).toBeDefined()
    expect(globalStateStore.controls.stand).toBeDefined()
  })

  it('should have error code ', () => {
    const globalStateStore = useGlobalStateStore()
    expect(globalStateStore.errorCode).toBe(0)

  })

})
