# ARCHITECTURAL DECISION RECORD

## GENERAL CONSIDERATIONS

### TypeScript

I decided to use typescript because it adds static typing with optional type annotations to JavaScript. It also
improves tooling, scalability, and enhanced features like interfaces and generics.

The biggest drawback comes to the fact that we are adding new tooling to transpile javascript which costs time and configuration issues

### CI/CD

To ensure linting, type checking, and test running, we could use local precomits
like lint-stag and husky or we can rely on CI/CD flows.

The approach that I followed was to setup GitHub actions because it is a better way to work since
there is only one place to check all the building rules and do not rely on users' local machine

### Testing

I like to have my **unit test** and **component test** in the same folder as the file that is being tested, so I can group them and
know at first site if I already add unit test for that module or not, also because when you are working
on a functionality, you are likely to modify the test and it is easy to have both files under the same directory.

For **integration test** or **end to end** I like to group all of them under `test` folder

## CLIENT

**Vue3**: Vue is a well-known front-end framework, as good as any other like React or angular.

Another alternative could be dealing with plain JS, in this case since I don't have too much time
and I also need to implement the Back For Front, going with this approach will speed up things a bit

### State management

This application is not big so we could go with different approaches to maintain the state of the application and have all the components sync.

The simplest one to avoid property drillings will be using a dependency injection like provider/inject pattern and having everything stored in a global object in the provider.

The other solution could be using a standardized state management like Vuex (redux like) or Pinia.

In this case, I'm going to use Pinia which is the next generation of Vuex that has a slightly different approach, based on composables ( react hooks) and modularized by default

### Testing

**MSW**: MSW is a Mocked Service Worker, very easy to use and very handy to intercept calls to the server, it is based on service workers.
We can use it for testing purposes.

There is another advantage about using MSW and that is that you can use it for your front end applications or node, in this case, I only use it in the front-end application but it will be very easy to use it on node

**Cypress**: We Will use Cypress for functional test and **component test**

**Vitest**: Since we are using Vue with Vite, we will run our unit test on Vitest,
that way we don't need to use Babel or Webpack and we reduce the friction of the tooling ecosystem.

Also, we are using vitest on the backend test

When generating component tests I like to store those cypress tests along with the components like I do with unit test for the same reason as stated previously on unit testing.

My approach is to test **visual modules (components or views) with Cypress** and not vitest (or JEST), this is because I found it more reliable and accurate to use a real DOM tester like Cypress where I can test properties been passed to the component along with visual changes and states. Also, the idea to test a component is to be as close as possible to user interaction and to rely on the platform, for that intention I also use `testing library to use native elements like aria roles.

**Visual regression test**. There are a lot of tools to generate visual regression tests. I like to generate those visual tests locally and not rely on third-party providers like Chromatic, cypress.io, etc.

For this project, I'm using `cypress-visual-regression` which is a handy plugin to be used in Cypress to store base components and compare them with current test.

All tests used as a reference are stored in:

```
|-- /cypress/
 |-- /snapshots/
   |-- /base/  # all the base images stored as a reference under control version
   |-- /actual/ # excluded from control version, will contain the actual images generated to be compared with base
   |-- /diff/ # excluded from control version, if there are discrepancies between base and actual image a diff image will be generated
```

## SERVER

**Koa**: Koa is a framework designed by the team behind Express, which aims to be a smaller,
more expressive, and more robust foundation for web applications and APIs.
Another advantage that I found is that it is modularized and comes with the minimum requirements and then the developers decides what middleware to use

**Vitest**: Used for unit test. This framework has an advantage over JEST since we don't need to
bundle (webpack) or transpile (babel) the code since it uses ES modules directly with Vite server

**Supertest**: Framework used to do integration test for routes and controllers

### State

Since our server is stateless, we need to set a mechanism to let the server store
information between API calls.

To do so we are going to share a token between the server and client to identify the session.
For the sake of simplicity we are going to share a random hash, in a more elaborated project we could use JWT as an example

### Persistence layer

Since we are keeping track of each game, we need to persist that information for future recovery.

We can use a Database like MySQL or PostgreSQL or even NoSQL data bases like Mongo and we can persist the data on file or just in memory.
In this case, I'm choosing **lowDB** which they describe as Simple to use type-safe local JSON database.

I will use it as an in-memory DB but I also comment on the line to persist it into a file

### Interface agreement

Due to lack of time, I'm not going to generate the OPEN API Specs for the interface agreement
Ideally, we should publish an OPEN API Json to share between back and front, and since we are using TS
we could automatically generate the types needed

### Security

I disallow cors by adding `Access-Control-Allow-Origin: *` in order to test the server with front end application and not have cors issues on the browser. In production environment, this cannot be set to any origin

This is a 0 thrust application, which means that we don't trust any function call that is coming from the outside (front-end application) and we will try to ensure that the user is not trying to cheat
