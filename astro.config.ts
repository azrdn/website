import { defineConfig } from "astro/config";
import sitemap from "@astrojs/sitemap";

// https://astro.build/config
export default defineConfig({
	site: process.env.SITE, // astro/issues/3897
	integrations: [sitemap()],
	server: {
		host: true,
	},
	markdown: {
		shikiConfig: {
			theme: 'github-dark-dimmed'
		}
	},
	experimental: {
		contentIntellisense: true,
	}
});
