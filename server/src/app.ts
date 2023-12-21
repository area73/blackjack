import * as Koa from 'koa'
import { DefaultContext, DefaultState, ParameterizedContext} from 'koa'
import * as Router from 'koa-router'
import 'colors'

const port = 3000

const app: Koa<DefaultState, DefaultContext> = new Koa()

const router: Router = new Router()

router.get(
  '/',
  async (ctx:ParameterizedContext<DefaultState, DefaultContext>) => {
    ctx.body = {msg: 'hellow world'}
  }
)

app.use(router.routes()).use(router.allowedMethods())

app.listen(port)

  console.log(
  `server started on http://localhost:${port}`.green.bgBlack,
  )


