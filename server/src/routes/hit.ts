import * as Router from "@koa/router";
const router = new Router({ prefix: "/hit" });

router.get("/", async (ctx, _next) => {
  ctx.body = { msg: "HIT world" };
});

export default router;
