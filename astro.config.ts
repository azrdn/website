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
	},
	experimental: {
		fonts: [{
			provider: "local",
			name: "Gitlab Mono Subset",
			variants: [{
				weight: "100 800",
				style: "normal",
				src: ["./src/styles/gitlab-mono.woff2"], // causes tech(undefined) which makes the font wont load
				// src: [{ url:"./src/styles/gitlab-mono.woff2", tech: "variations" }], // this loads correctly
			}],
			cssVariable: "--font-subset",
			optimizedFallbacks: false,
		}]
	}
});
