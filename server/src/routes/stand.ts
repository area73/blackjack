import Router from "@koa/router";
import { stand } from "../controllers/stand";
const router = new Router({ prefix: "/stand" });

router.get("/", stand);

export default router;
