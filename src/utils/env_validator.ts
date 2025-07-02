import { z } from "astro/zod";

const env_schema = z.object({
	ASCII_ART_URL: z.string().url(),
	ROBOTS_TXT_URL: z.string().url(),
	REPO_URL: z.string().url(),
});

const result = env_schema.safeParse(import.meta.env);

if (!result.success) {
	console.error("Environment variables error:");
	result.error.issues.map(err => {
		console.error(`- ${err.path}: ${err.message}`);
	});
	process.exit(1);
}

type EnvSchema = z.infer<typeof env_schema>;
declare global {
	interface ImportMetaEnv extends EnvSchema {}
}
