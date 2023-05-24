import express from "express"
import setUpMidllewares from './middlewares'
import setUpRoutes from './routes'

const app = express()
setUpMidllewares(app)
setUpRoutes(app)
export default app