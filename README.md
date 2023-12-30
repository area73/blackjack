# blackjack

BlackJack implementation

## Please take a look at the ADR ( Architectural Decision Record), to understand the decisions made

Please use **pnpm** as a package manager for both projects

# CLIENT (Front end application)

## how to start front end application (dev mode)

from this root folder go open a new terminal

```bash
cd ./client
pnpm i
pnpm dev
```

this will publish compiled dev app with hot reload to `localhost:5173`

### Environments

You can change you environment variables pointing to server by overriding ENV vat to be set to development, production or staging

### Testing

#### Unit test:

I'm unit testing _only non visual_ modules like composables , stores etc, for more info on this decision please read [ADR](./ADR.md)

```bash
pnpm test  # I'm assuming that you previously install dependencies and you are in the client folder
```

#### Component test:

Cypress component testing for any visual component or view

```bash
pnpm test:components # runs cypress (headless)
pnpm test:components:dev # opens cypress (chrome)
```

#### e2e test:

Cypress e2e or integration test

```bash
pnpm test:e2e # runs cypress (headless)
pnpm test:e2e:dev # opens cypress (chrome)
```

#### Automatic Visual Regression test:

To run the test they are integrated within component cypress test so just run any of :

```bash
pnpm test:components # runs cypress (headless)
pnpm test:components:dev # opens cypress (chrome)
```

If there are changes on visual test and those changes are legit you will need to regenerate all the base images in order to keep the changes

```bash
pnpm test:components:visual-regenerate # to regenerate components screenshots
```

### Production suild

To generate a production ready build you can run :

```bash
pnpm build-only
```

# SERVER

Please use **pnpm** as a package manager for both projects

## how to start back end application (dev mode)

from this root folder go open a new terminal

```bash
cd ./server
pnpm i
pnpm dev
```

This will run a dev server on `localhost:3000`
