
import cors from "cors"
import helmet from "helmet"
import morgan from "morgan"
import express from "express"

import { log, config, prisma } from "@repo/lib"

export const createServer = (): express.Express => {

    const app = express();

    app.use(helmet())
    app.use(morgan("dev"))
    app.use(express.urlencoded({ extended: true }))
    app.use(express.json())
    app.use(cors())

    app.get("/api/users", async (req, res) => {
        return res.json({ counter: await prisma.user.findMany() })
    })

    app.post("/api/users", async (req, res) => {

        try {

            log(req.body)

            if (await prisma.user.count() >= 5) {
                await prisma.user.deleteMany()
            }

            const lastId = await prisma.user.findFirst({ orderBy: { id: "desc" }, select: { id: true } }) || { id: 0 }
            await prisma.user.create({ data: { email: `${req.body.email}${lastId.id + 1}` } })

            return res.status(200).json({ code: 200, message: "User created" })

        } catch (error) {
            return res.status(500).json({ code: 500, message: "Error User not created" })
        }
    })

    return app
}

const server = createServer()

server.listen(config.api_port, () => {
    log(`api running on ${config.api_port}`)
})
