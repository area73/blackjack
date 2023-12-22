import * as Router from "@koa/router";
const router = new Router({ prefix: "/stand" });

router.get("/", async (ctx, _next) => {
  ctx.body = { msg: "STAND world" };
});

export default router;
