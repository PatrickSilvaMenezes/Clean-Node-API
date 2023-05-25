import { Express, Router } from "express"
import { readdirSync } from 'node:fs'
import { join } from 'node:path'
export async function setupRoutes(app: Express) {
  const router = Router()
  app.use('/api', router)
  readdirSync(join(__dirname, '../routes')).map(async (filename) => {
    if (!filename.endsWith('.map')) {
      (await import(`../routes/${filename}`)).default(router)
    }
  })
}