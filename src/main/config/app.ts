import express, { Express } from "express"
import setUpMidllewares from './middlewares'
import { setupRoutes } from './routes'

const app = express()
setUpMidllewares(app)
setupRoutes(app)
export default app
