import express from "express"
import setUpMidllewares from './middlewares'

const app = express()
setUpMidllewares(app)
export default app