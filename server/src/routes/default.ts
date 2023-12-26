import Router from "@koa/router";
const router = new Router({ prefix: "/" });

/**
 * Not used in this project , just keep it as a default route
 */
router.get("/", async (ctx, _next) => {
  ctx.body = { msg: "Default route" };
});

export default router;
