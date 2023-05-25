import express, { Express } from "express"
import { cors, contentType } from "../middlewares"
import { bodyParser } from "../middlewares/body-parser"

export default (app: Express): void => {
  app.use(express.json())
  app.use(cors)
  app.use(bodyParser)
  app.use(contentType)
}