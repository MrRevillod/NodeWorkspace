
import { config } from "./config"
import { PrismaClient } from "@prisma/client"

const prisma = new PrismaClient()

const log = (...args: unknown[]): void => {
	console.log("LOGGER: ", ...args)
}

export { config, prisma, log }