import type { AstroIntegration } from "astro"
import { execSync } from "node:child_process"
import { writeFileSync } from "node:fs"

export default (outFile: string = "public/commit_hash.json"): AstroIntegration => ({
	name: "commit-hash",
	hooks: {
		"astro:config:setup": () => {
			const stdout = execSync("git rev-parse --short HEAD",
				{
					timeout: 2000,
					encoding: "utf8",
				}
			)
			
			writeFileSync(outFile, JSON.stringify({ hash: stdout.trim() }))
			console.info(`Written latest git commit hash to ${outFile}`)
		}
	}
})
