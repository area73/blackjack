import * as Router from "@koa/router";
const router = new Router({ prefix: "/dealer" });

router.get("/", async (ctx, _next) => {
  ctx.body = { msg: "Dealer" };
});

export default router;
