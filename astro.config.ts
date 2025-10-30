import { builtinModules } from "node:module"
import cloudflare from "@astrojs/cloudflare"
import mdx from "@astrojs/mdx"
import sitemap from "@astrojs/sitemap"
import { defineConfig, envField as env } from "astro/config"

export default defineConfig({
	site: "https://azrd.dev",
	adapter: cloudflare({ imageService: "passthrough" }),
	integrations: [sitemap(), mdx()],
	scopedStyleStrategy: "class",
	server: { host: true },
	build: {
		format: "preserve",
		assets: "static",
	},
	vite: {
		ssr: {
			external: [
				...builtinModules,
				...builtinModules.map(mod => `node:${mod}`),
			],
		},
	},
	env: {
		schema: {
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
		},
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
						style: "normal",
						src: ["./src/styles/font.woff2"],
					},
					{
						weight: "400 700",
						style: "oblique",
						variationSettings: "'slnt' -8",
						src: ["./src/styles/font.woff2"],
					},
				],
				fallbacks: ["monospace"],
				cssVariable: "--font-subset",
			},
		],
	},
})
