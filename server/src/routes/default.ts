import Router from "@koa/router";
const router = new Router({ prefix: "/" });

router.get("/", async (ctx, _next) => {
  ctx.body = { msg: "Default route" };
});

export default router;
