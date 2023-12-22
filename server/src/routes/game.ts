import * as Router from "@koa/router";
const router = new Router({ prefix: "/new-game" });

router.get("/", async (ctx, _next) => {
  ctx.body = { msg: "New Game" };
});

export default router;
