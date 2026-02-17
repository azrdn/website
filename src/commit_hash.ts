import { execSync } from "node:child_process"
import fs from "node:fs/promises"

const hash = execSync(
	"git rev-parse --short HEAD",
	{
		timeout: 2000,
		encoding: "utf8",
	}
).trim()

await fs.writeFile("public/commit_hash.json", JSON.stringify({ hash }))
