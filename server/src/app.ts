import cors from "@koa/cors";
import "colors";
import Koa, { type Middleware } from "koa";
import bodyParser from "koa-bodyparser";
// import proxy from "koa-proxies";
import appRouter from "./routes";

const port = 3000;
const app = new Koa();

app.use(cors() as Middleware);
app.use(appRouter);
app.use(bodyParser() as Middleware);
app.on("error", (err, _ctx) => {
  console.log(`${err}`.white.bgRed);
});

if (process.env.NODE_ENV !== "test") {
  app.listen(port, () => {
    console.log(`server started on http://localhost:${port}`.green.bgBlack);
  });
}

export { app };
