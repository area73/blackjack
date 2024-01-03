import type { APIResponse } from '@@/shared';
import { createPinia, setActivePinia } from 'pinia';
import { beforeEach, describe, expect, it, vi, type MockInstance } from 'vitest';
import { useBlackJackFetch } from './useBlackJackFetch';

function fetchSpyHeaders(idx = 0) {
  return fetchSpy.mock.calls[idx][1]!.headers
}

let fetchSpy = vi.spyOn(window, 'fetch') as MockInstance<any>


describe('onFetchError', () => {
  beforeEach(() => {
    setActivePinia(createPinia())
    fetchSpy = vi.spyOn(window, 'fetch')
  })
  it('should return custom error with status code from response', async () => {
    const { error, execute } = useBlackJackFetch('http://test', {
      immediate: false
    }).json<APIResponse>()
    await execute()
    expect(error.value).toEqual({ code: 1, message: 'fetch failed' });
  });


  it('should return custom error with status code from response', async () => {

    const { error, execute } = useBlackJackFetch('http://www.google.com', {
      immediate: false
    }).json<APIResponse>()
    await execute()
    expect(error.value).include({ code: 200 });
  })



  it('should chain beforeFetch function ', async () => {
    const { execute } = useBlackJackFetch('http://test', {
      immediate: false
    }).json<APIResponse>()
    await execute()

    expect(fetchSpyHeaders()).toMatchObject({ "Authorization": "123", })

  })


});
