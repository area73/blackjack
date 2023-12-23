import Router from "@koa/router";
const router = new Router({ prefix: "/hit" });

router.get("/", (ctx, _next) => {
  ctx.body = { msg: "HIT world" };
});

export default router;
