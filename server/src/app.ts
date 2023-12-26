import "colors";
import Koa from "koa";
import appRouter from "./routes";

const app = new Koa();

app.use(appRouter);

app.on("error", (err, _ctx) => {
  console.log(`${err}`.white.bgRed);
});

export { app };
