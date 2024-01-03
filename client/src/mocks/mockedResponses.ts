import type { APIResponse } from "@@/shared";

type MockParams = {
  message?: Partial<APIResponse["message"]>;
  user?: Partial<APIResponse["game"]["user"]>;
  dealer?: Partial<APIResponse["game"]["dealer"]>;
  token: string;
}


const mock = ({ token, message, user, dealer }: MockParams) => {
  return {
    message: {
      code: 2100,
      message: "Your turn",
      ...message,
    },

    game: {
      id: "l228v17ert",
      user: {
        cards: ["H-8", "D-J"],
        score: [18],
        state: "playing",
        ...user
      },
      dealer: {
        cards: ["H-7"],
        score: [7],
        state: "playing",
        ...dealer
      }
    },
    token
  }
}


export const mockedNewGameResponses = {
  newGame: mock({ token: '01a', message: { code: 2100, message: "Your turn" } }),
  newGameDealer: mock({ token: '02a' }),
  newGameAces: mock({ token: '03a', user: { cards: ["H-A", "D-5"], score: [6, 16] } }),
  newGameBlackJack: mock({ token: '04a', user: { cards: ["H-A", "D-J"], score: [21] }, message: { code: 9999, message: "Black Jack !" } }),
}

export const mockedHitResponses = {
  '01b': mock({
    token: '01b',
    user: {
      cards: ["H-8", "D-J", "D-2"],
      score: [20],
    },
  }),
  '01c': mock({
    message: { code: 4000, message: "Dealer wins" },
    token: '01c',
    user: {
      cards: ["H-8", "D-J", "D-2", "S-8"],
      score: [28],
      state: "busted",
    },
  }),
  '01d': mock({
    message: { code: 2000, message: "You win" },
    token: '01d',
    user: {
      cards: ["H-8", "D-J", "D-2",],
      score: [20],
      state: "stand",
    },
    dealer: {
      cards: ["H-7", "S-8", "A-10"],
      score: [25],
      state: "busted",
    }
  }),
  '02c': mock({
    token: '02c',
    message: { code: 4000, message: "Dealer wins" },
    user: {
      cards: ["H-8", "D-J"],
      score: [18],
      state: "stand",
    },
    dealer: {
      cards: ["H-7", "S-8", "A-6"],
      score: [21],
      state: "playing",
    }
  }),
  '03b': mock({
    token: '03b',
    message: { code: 2100, message: "Your turn" },
    user: {
      cards: ["H-A", "D-5", "S-8"],
      score: [14],
      state: "playing",
    },
  }),
}
export const mockedStandResponses = {
  '01c': mock({
    message: { code: 2000, message: "You win" },
    token: '01c',
    user: {
      cards: ["H-8", "D-J", "D-2",],
      score: [20],
      state: "stand",
    },
    dealer: {
      cards: ["H-7", "S-8"],
      score: [15],
      state: "playing",
    }
  }),
  '02b': mock({
    token: '02b',
    user: {
      cards: ["H-8", "D-J"],
      score: [18],
      state: "stand",
    },
    dealer: {
      cards: ["H-7", "S-8"],
      score: [15],
      state: "playing",
    }
  }),
}
