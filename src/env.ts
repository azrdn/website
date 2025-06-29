import { z } from "astro/zod";

const schema = z.object({
	ASCII_ART_URL: z.string().min(1),
	ROBOTS_TXT_URL: z.string().min(1),
	REPO_URL: z.string().min(1),
});

const { error } = schema.safeParse(process.env);
if (error) {
	console.error("env vars error, plz fix");
	for (const err of error.issues) {
		console.error(`- ${err.path}: ${err.message}`)
	}
	process.exit(1);
}

type EnvSchemaType = z.infer<typeof schema>;

declare global {
	interface ImportMetaEnv extends EnvSchemaType {}
}
