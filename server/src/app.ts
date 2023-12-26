import "colors";
import Koa from "koa";
import appRouter from "./routes";

const port = 3000;
const app = new Koa();

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
