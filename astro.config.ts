import { loadEnv } from "vite";
import { defineConfig } from "astro/config";
import sitemap from "@astrojs/sitemap";

const env = loadEnv('production', process.cwd(), "");

export default defineConfig({
	site: env.SITE,
	integrations: [sitemap()],
	trailingSlash: 'always',
	server: {
		host: true,
	},
	markdown: {
		shikiConfig: {
			theme: 'catppuccin-macchiato'
		}
	},
	experimental: {
		fonts: [
			{
				provider: "local",
				name: "gitlabmono",
				variants: [{
					weight: "100 800",
					style: "normal",
					src: ["./src/styles/GitLabMono.woff2"],
				}],
				fallbacks: ["monospace"],
				cssVariable: "--font-subset",
			},
			{
				provider: "local",
				name: "gitlabmono-ital",
				variants: [{
					weight: "100 800",
					style: "italic",
					src: ["./src/styles/GitLabMono-Italic.woff2"]
				}],
				fallbacks: ["monospace"],
				cssVariable: "--font-subset-ital"
			}
		]
	}
});
