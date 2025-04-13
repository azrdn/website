import { loadEnv } from "vite";
import { defineConfig } from "astro/config";
import sitemap from "@astrojs/sitemap";

const env = loadEnv('production', process.cwd(), "");

export default defineConfig({
	site: env.SITE,
	integrations: [sitemap()],
	server: {
		host: true,
	},
	markdown: {
		shikiConfig: {
			theme: 'github-dark-dimmed'
		}
	}
});
