import { useGameStore } from "@/stores/game";
import type { APIResponse } from "@@/shared";
import { createPinia, setActivePinia } from "pinia";
import { beforeEach, describe, expect, it } from 'vitest';
import { APIMapper } from './APIMapper';

const mockApiResponse: APIResponse = {
  game: {
    dealer: {
      cards: ['D-A', 'D-2'],
      score: [3, 13],
      state: 'not-started',
    },
    user: {
      cards: ['D-7', 'D-10'],
      score: [17],
      state: 'playing',
    },
    id: '1234',
  },
  message: { code: 1000, message: 'player turn patched' },
  token: '1234',
};

describe('APIMapper', () => {

  let mockFrontResponse: ReturnType<typeof useGameStore>;

  beforeEach(() => {
    setActivePinia(createPinia())
    mockFrontResponse = useGameStore();
    mockFrontResponse.$patch((state) => {
      state.token = '1234';
      state.dealerHand = {
        cards: ['D-A', 'D-2'],
        score: [3, 13],
        state: 'not-started',
      };
      state.playerHand = {
        cards: ['D-7', 'D-10'],
        score: [17],
        state: 'playing',
      };
      state.userMessage = { code: 1000, message: 'player turn patched' };
    });
  });

  it('should correctly map from API response to front response', () => {
    const result = APIMapper.fromAPI(mockApiResponse);
    expect(result).toEqual(mockFrontResponse.$state);
  });

});
