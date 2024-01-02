import { HttpResponse, http, type HttpHandler } from 'msw'

// const { pathname } = new URL(window.location.href)

export const handlers: HttpHandler[] = [
  http.get('http://localhost:3000/new-game', () => {
    return HttpResponse.json({
      firstName: 'John',
      lastName: 'Maverick',
    })
  }),
]
