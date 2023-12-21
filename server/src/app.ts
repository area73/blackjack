import "colors";
import * as Koa from "koa";
import {
  type DefaultContext,
  type DefaultState,
  type ParameterizedContext,
} from "koa";
import * as Router from "koa-router";

const port = 3000;

const app = new Koa<DefaultState, DefaultContext>();

const router: Router = new Router();

router.get(
  "/",
  async (ctx: ParameterizedContext<DefaultState, DefaultContext>) => {
    ctx.body = { msg: "hello world" };
  }
);

app.use(router.routes()).use(router.allowedMethods());

app.listen(port);

console.log(`server started on http://localhost:${port}`.green.bgBlack);
