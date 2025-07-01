import { z } from "astro/zod";

const env_schema = z.object({
	ASCII_ART_URL: z.string().url(),
	ROBOTS_TXT_URL: z.string().url(),
	REPO_URL: z.string().url(),
});

const result = env_schema.safeParse(process.env);

if (!result.success) {
	result.error.issues.map(err => {
		console.error(`- ${err.path}: ${err.message}`);
	});
	process.exit(1);
}

type EnvSchema = z.infer<typeof env_schema>;
declare global {
	interface ImportMetaEnv extends EnvSchema {}
	namespace NodeJS {
		interface ProcessEnv extends EnvSchema {}
	}
}
