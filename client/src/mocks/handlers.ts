import { BASE_URL_API } from '@/utils/const';
import { HttpResponse, http, type HttpHandler } from 'msw';
import { mockedHitResponses, mockedNewGameResponses, mockedStandResponses } from './mockedResponses';


const incrementLetter = (codeWithLetter: string) => {
  const numberCode = codeWithLetter.slice(0, 2)
  const charCode = codeWithLetter.charAt(codeWithLetter.length - 1)
  switch (charCode) {
    case 'a':
      return numberCode + 'b'
    case 'b':
      return numberCode + 'c'
    case 'c':
      return numberCode + 'd'
    case 'd':
      return numberCode + 'e'
    default:
      return numberCode + 'a'
  }
}

export const handlers: HttpHandler[] = [
  http.get(`${BASE_URL_API}/new-game`, () => {
    const searchParams = new URLSearchParams(window.location.search);
    const flow = searchParams.get('flow') || 'newGame';
    const error = searchParams.get('error');
    if (error) {
      return error === 'genericError' ? HttpResponse.error() : HttpResponse.json({}, { status: parseInt(error) })
    }
    // @ts-expect-error
    return HttpResponse.json(mockedNewGameResponses[flow])
  }),
  http.get(`${BASE_URL_API}/hit`, ({ request }) => {
    const previousAuthToken = request.headers.get('Authorization')
    const newTokenFlow = incrementLetter(previousAuthToken!)
    // @ts-expect-error
    return HttpResponse.json(mockedHitResponses[newTokenFlow])
  }),
  http.get(`${BASE_URL_API}/stand`, ({ request }) => {
    const previousAuthToken = request.headers.get('Authorization')
    const newTokenFlow = incrementLetter(previousAuthToken!)
    // @ts-expect-error
    return HttpResponse.json(mockedStandResponses[newTokenFlow])
  }),
]
