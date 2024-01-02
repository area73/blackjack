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
  http.get('http://localhost:3000/new-game', () => {
    const searchParams = new URLSearchParams(window.location.search);
    const flow = searchParams.get('flow') || 'none';
    console.log('Mocking flow: ', flow);
    // @ts-expect-error
    return HttpResponse.json(mockedNewGameResponses[flow])
  }),
  http.get('http://localhost:3000/hit', ({ request }) => {
    const previousAuthToken = request.headers.get('Authorization')
    const newTokenFlow = incrementLetter(previousAuthToken!)
    // @ts-expect-error
    return HttpResponse.json(mockedHitResponses[newTokenFlow])
  }),
  http.get('http://localhost:3000/stand', ({ request }) => {
    const previousAuthToken = request.headers.get('Authorization')
    const newTokenFlow = incrementLetter(previousAuthToken!)
    // @ts-expect-error
    return HttpResponse.json(mockedStandResponses[newTokenFlow])
  }),
]
