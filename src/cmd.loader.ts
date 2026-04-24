import type { Loader } from 'astro/loaders';
import { z } from "astro/zod"
import { execSync } from "node:child_process";

export const cmdSchema = z.object({
	cmd: z.string(),
	output: z.string(),
})

type CmdSchema = z.infer<typeof cmdSchema>

export const cmdLoader = (cmds: string[]) => ({
	name: "cmdLoader",
	schema: cmdSchema,

	load: async ({ store, parseData }) => {
		for (const [i, cmd] of cmds.entries()) {
			const id = `${i}`
			const output = execSync(cmd).toString().trim()
			const data = await parseData<CmdSchema>({
				id,
				data: {
					cmd,
					output
				}
			})
			store.set<CmdSchema>({ id, data })
		}
	}
}) satisfies Loader
