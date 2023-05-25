import express, { Express } from "express"
import setUpMidllewares from './middlewares'
import setUpRoutes from './routes'

export const setupApp = async (): Promise<Express> => {
  const app = express()
  setUpMidllewares(app)
  setUpRoutes(app)
  return app
}