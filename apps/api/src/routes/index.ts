import fs from "node:fs"
import path from "node:path"

import { log } from "@repo/lib"
import { Router } from "express"

const dir = __dirname
const router: Router = Router()

const removeFileExtension = (filename: string) => {
	return filename.split(".").at(0) as string
}

fs.readdirSync(dir).filter(async (file: string) => {
	const routeName = removeFileExtension(file)

	if (routeName !== "index") {
		const routePath = path.join(dir, routeName)

		try {
			const route: Router = await import(routePath).then((module) => module.default)
			router.use(`/${routeName}`, route)
			log("CARGAR RUTA ---->", routePath)
			log("CARGAR RUTA ---->", routePath)
			log("CARGAR RUTA ---->", routePath)
			log("CARGAR RUTA ---->", routePath)
			log("CARGAR RUTA ---->", routePath)
			log("CARGAR RUTA ---->", routePath)
			log("CARGAR RUTA ---->", routePath)
			log("CARGAR RUTA ---->", routePath)
			log("CARGAR RUTA ---->", routePath)
		} catch (error) {
			log("ERROR AL CARGAR RUTA ---->", routePath)
		}
	}
})

export default router
