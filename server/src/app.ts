import cors from "@koa/cors";
import "colors";
import Koa, { type Middleware } from "koa";
import bodyParser from "koa-bodyparser";
// import proxy from "koa-proxies";
import appRouter from "./routes";

const port = 3000;
const app = new Koa();

app.use(appRouter);
app.use(bodyParser() as Middleware);
app.use(
  cors({
    credentials: false,
    origin(ctx) {
      return ctx.get("Origin") !== "" ? ctx.get("Origin") : "*";
    },
    privateNetworkAccess: true,
    allowMethods: ["GET", "OPTIONS"],
    allowHeaders: [
      "Origin', 'X-Requested-With', 'Content-Type', 'Accept', 'Authorization'",
    ],
    exposeHeaders: "*",
  }) as Middleware
);

app.on("error", (err, _ctx) => {
  console.log(`${err}`.white.bgRed);
});

if (process.env.NODE_ENV !== "test") {
  app.listen(port, () => {
    console.log(`server started on http://localhost:${port}`.green.bgBlack);
  });
}

export { app };
