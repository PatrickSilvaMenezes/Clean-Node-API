import { Router, Request, Response } from "express";

export default function (router: Router): void {
  router.get('/health', (req: Request, res: Response) => {
    res.json({ message: `${new Date()}` }).status(200)
  })
}