# Architectural Decision Record

## General considerations

**TypeScript:**
I decide to use typescript because it adds static typing with optional type annotations to JavaScript. It also
improved tooling, scalability, and enhanced features like interfaces and generics.

The biggest drawback comes to the fact that we are adding a new tooling to transpile javascript which cost time and configuration issues

## Client

**Vue3**: Vue is a well known frontend framework, as good as any other like react or angular.
Another alternative could be dealing with plain JS, in this case since I don't have too much time and I also need to implement the Back For Front, goin whit this approach will speed up thing a little bit

**MSW**: MSW is a Mocked Service Worker , very easy to use and very handy to intercept calls to the server.
We can us it for testing purpose

**Cypress**: We Will use Cypress for functional test and **component test**

**Vitest**: Since we are using Vue with Vite , we will run our unit test on Vitest, that way we don't need tom use Babel or Webpack and we reduce the friction of the tooling ecosystem

## Server

**Koa**: Koa is a new web framework designed by the team behind Express, which aims to be a smaller, more expressive, and more robust foundation for web applications and APIs. By leveraging async functions, Koa allows you to ditch callbacks and greatly increase error-handling. Koa does not bundle any middleware within its core, and it provides an elegant suite of methods that make writing servers fast and enjoyable.
