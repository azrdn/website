import { envField as env } from "astro/config"

export const schema = {
	ASCII_ART_URL: env.string({
		context: "server",
		access: "public",
		optional: false,
	}),
	ROBOTS_TXT_URL: env.string({
		context: "server",
		access: "public",
		optional: false,
	}),
	REPO_URL: env.string({
		context: "server",
		access: "public",
		optional: false,
	}),
}
