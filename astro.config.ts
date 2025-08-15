import mdx from "@astrojs/mdx";
import sitemap from "@astrojs/sitemap";
import { defineConfig } from "astro/config";

export default defineConfig({
	site: "https://azrd.dev",
	integrations: [sitemap(), mdx()],
	scopedStyleStrategy: "class",
	server: { host: true },
	build: {
		format: "preserve",
		assets: "static",
		concurrency: 2,
	},
	devToolbar: { enabled: false },
	markdown: {
		shikiConfig: {
			defaultColor: false,
			themes: {
				dark: "catppuccin-macchiato",
				light: "github-light",
			},
		},
	},
	experimental: {
		contentIntellisense: true,
		fonts: [
			{
				provider: "local",
				name: "gitlabmono",
				variants: [
					{
						weight: "100 800",
						style: "normal",
						src: ["./src/styles/GitLabMono.woff2"],
					},
					{
						weight: "100 800",
						style: "italic",
						src: ["./src/styles/GitLabMono-Italic.woff2"],
					},
				],
				fallbacks: ["monospace"],
				cssVariable: "--font-subset",
			},
		],
	},
});
