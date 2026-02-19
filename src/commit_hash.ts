import type { AstroIntegration } from "astro"
import { execSync } from "node:child_process"
import { writeFileSync } from "node:fs"

export default (): AstroIntegration => ({
	name: "commit-hash",
	hooks: {
		"astro:config:setup": () => {
			const hash = execSync("git rev-parse --short HEAD",
				{
					timeout: 2000,
					encoding: "utf8",
				}
			).trim()
			
			writeFileSync("public/commit_hash.json", JSON.stringify({ hash }))
			console.info("Written latest git commit hash to public directory.")
		}
	}
})
