import cloudflare from "@astrojs/cloudflare"
import mdx from "@astrojs/mdx"
import sitemap from "@astrojs/sitemap"
import commitHash from "./src/commit_hash"
import { defineConfig, envField as env, fontProviders } from "astro/config"

export default defineConfig({
	site: "https://azrd.dev",
	adapter: cloudflare({ imageService: "passthrough" }),
	integrations: [sitemap(), mdx(), commitHash()],
	scopedStyleStrategy: "class",
	server: { host: true },
	build: {
		format: "preserve",
		assets: "static",
	},
	vite: {
		build: {
			assetsInlineLimit: 1024,
		}
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
				provider: fontProviders.local(),
				name: "myfont",
				fallbacks: ["monospace"],
				cssVariable: "--font-subset",
				options: {
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
					]
				}
			},
		],
	},
})
