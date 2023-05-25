import { PrismaHelper } from "../infra/db/prisma/prisma";
import { setupApp } from './config/app'
import { exec } from 'node:child_process'

const main = async () => {
  const app = await setupApp()
  const server = app.listen(process.env.PORT || 4040, () => {
    exec("npx prisma migrate dev --name v4 && npx prisma db push")
    console.log(`server is running on port ${process.env.PORT}`)
  })
  process.on('SIGTERM', () => {
    server.close(() => {
      PrismaHelper.$disconnect()
      process.exit(0)
    });
  });
}

main()
