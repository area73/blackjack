import compose from "koa-compose";

import dealerRouter from "./dealer";
import defaultRouter from "./default";
import gameRouter from "./game";
import hitRouter from "./hit";
import standRouter from "./stand";

const appRouter = compose([
  gameRouter.routes(),
  gameRouter.allowedMethods(),
  hitRouter.routes(),
  hitRouter.allowedMethods(),
  standRouter.routes(),
  standRouter.allowedMethods(),
  defaultRouter.routes(),
  defaultRouter.allowedMethods(),
  dealerRouter.routes(),
  dealerRouter.allowedMethods(),
]);

export default appRouter;
