import { literals } from '@/lang/literals'
import { useGameStore } from '@/stores/game'
import { BASE_URL_API, ERROR_MESSAGES } from '@/utils/const'
import type { APIResponse } from '@@/shared'
import { createFetch, type AfterFetchContext, type OnFetchErrorContext } from '@vueuse/core'

const beforeFetch = ({ options }: { options: RequestInit }) => {
  const { token } = useGameStore()
  const accessToken = token
  if (accessToken) {
    options.headers = {
      ...options.headers,
      Authorization: `${accessToken}`
    }
  }
  return { options }
}

const afterFetch = (ctx: AfterFetchContext) => {
  return ctx
}

export type CustomError = {
  code: number
  message: string
}

type ReqResponse = {
  data: APIResponse
  response: Response | null
  error: any
}

const onFetchError = (ctx: ReqResponse): Partial<OnFetchErrorContext<ReqResponse, CustomError>> => {
  const statusCode = ctx.response?.status
    ? ctx.response.status as keyof typeof ERROR_MESSAGES
    : 1;
  const customError: CustomError = {
    code: statusCode,
    message: ERROR_MESSAGES[statusCode] || literals.en.error.unknownError,
  };

  return { error: customError };
}


export const useBlackJackFetch = createFetch({
  baseUrl: BASE_URL_API,
  options: {
    beforeFetch,
    afterFetch,
    onFetchError
  },
  fetchOptions: {
    mode: 'cors'
  }
})
