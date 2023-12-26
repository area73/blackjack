import Router from "@koa/router";
import { hit } from "../controllers/hit";
const router = new Router({ prefix: "/hit" });

router.get("/", hit);

export default router;
