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

**Koa**: Koa is a new web framework designed by the team behind Express, which aims to be a smaller, more expressive, and more robust foundation for web applications and APIs.

### State

Since our server is stateless , we need to set a mechanism to let tje server store information between API calls.

In order to do so we are going to share a token between server and client to identify session. For the sake of simplicity we are going to share a random hash, in a more elaborated project we could use JWT as an example

### Persistance layer

Since we are keeping track of each game , we need to persist that information for future recovery.

We can use a Database like MySQL or postgreSQL or even noSQL data bases like Mongo and we can persist the data on file or just in memory, but for this case since this is a POC I will go for a simpler approach and I will build a persistance layer by using a Singleton pattern that warranty that the persistent object used to store the data wil be instantiate only one time
