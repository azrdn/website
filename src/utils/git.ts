import { exec } from "node:child_process"
import { promisify } from "node:util"

const run = promisify(exec)
const result = await run("git rev-parse --short HEAD", {
	timeout: 10000,
	encoding: "utf8",
}).catch(() => ({ stdout: "" }))

export const hash = result.stdout.trim()
