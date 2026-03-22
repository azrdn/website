import type { AstroIntegration } from "astro"
import { execSync } from "node:child_process"
import { writeFileSync } from "node:fs"

const hash_cmd = "git rev-parse --short HEAD"
const timestamp_cmd = "git show -s --format=%cd --date=format:'%Y-%m-%d' HEAD"

export default (outFile: string = "public/gitinfo.json"): AstroIntegration => ({
	name: "gitinfo",
	hooks: {
		"astro:config:setup": () => {
			try {
				const hash = execSync(hash_cmd).toString().trim()
				const timestamp = execSync(timestamp_cmd).toString().trim()

				writeFileSync(outFile, JSON.stringify({ hash, timestamp }))
				console.info(`Written latest git information to ${outFile}`)
			} catch {
				console.error("Failed to retrieve git information")
			}
		}
	}
})
