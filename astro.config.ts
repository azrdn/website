import mdx from "@astrojs/mdx"
import sitemap from "@astrojs/sitemap"
import { defineConfig } from "astro/config"
import { schema } from "./src/env"

export default defineConfig({
	site: "https://azrd.dev",
	integrations: [sitemap(), mdx()],
	scopedStyleStrategy: "class",
	server: { host: true },
	build: {
		format: "preserve",
		assets: "static",
	},
	env: {
		schema,
		validateSecrets: true,
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
				name: "myfont",
				variants: [
					{
						weight: "400 700",
						src: ["./src/styles/font.woff2"],
					},
				],
				fallbacks: ["monospace"],
				cssVariable: "--font-subset",
			},
		],
	},
})
