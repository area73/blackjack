import cors from "@koa/cors";
import "colors";
import Koa from "koa";
import bodyParser from "koa-bodyparser";
import logger from 'koa-logger';
import appRouter from "./routes";

const port = 3000;
const app = new Koa();
app.use(logger());
app.use(cors({
  allowMethods: ["GET", "OPTIONS"],
  privateNetworkAccess: true,
  allowHeaders: ["Content-Type", "Authorization", "Accept"],
  exposeHeaders: ["Content-Length", "Date", "X-Request-Id"],

}));
app.use(bodyParser());
app.use(appRouter);
app.on("error", (err, _ctx) => {
  console.log(`${err}`.white.bgRed);
});

if (process.env.NODE_ENV !== "test") {
  app.listen(port, () => {
    console.log(`server started on http://localhost:${port}`.green.bgBlack);
  });
}

export { app };
