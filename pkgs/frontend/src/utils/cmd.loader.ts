import { execSync } from "node:child_process";
import type { Loader } from "astro/loaders";
import { z } from "astro/zod";

export const cmdSchema = z.object({
	cmd: z.string(),
	output: z.string(),
});

type CmdSchema = z.infer<typeof cmdSchema>;

/**
 * Build time loader so commands can be executed without constraints from
 * environments that isn't fully compatible with node. (e.g workerd)
 */
export const cmdLoader = (cmds: { [K in string]: string }) =>
	({
		name: "cmdLoader",
		schema: cmdSchema,
		load: async ({ store, parseData }) => {
			for (const [id, cmd] of Object.entries(cmds)) {
				const output = execSync(cmd).toString().trim();
				const data = await parseData<CmdSchema>({
					id,
					data: { cmd, output },
				});
				store.set<CmdSchema>({ id, data });
			}
		},
	}) satisfies Loader;
