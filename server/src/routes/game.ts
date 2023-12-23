import Router from "@koa/router";
import { getNewGame } from "../controllers/game";
const router = new Router({ prefix: "/new-game" });

router.get("/", getNewGame);

export default router;
