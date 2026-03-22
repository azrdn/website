import cloudflare from "@astrojs/cloudflare"
import mdx from "@astrojs/mdx"
import sitemap from "@astrojs/sitemap"
import gitinfo from "./src/gitinfo"
import minify from 'astro-minify-html-swc'
import { defineConfig, envField as env, fontProviders } from "astro/config"

export default defineConfig({
	site: "https://azrd.dev",
	adapter: cloudflare({
		imageService: "passthrough",
		prerenderEnvironment: "node"
	}),
	integrations: [sitemap(), mdx(), gitinfo(), minify()],
	devToolbar: {
		enabled: false
	},
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
	markdown: {
		shikiConfig: {
			defaultColor: false,
			themes: {
				dark: "one-dark-pro",
				light: "one-light",
			},
		},
	},
	experimental: {
		contentIntellisense: true,
		queuedRendering: { enabled: true },
	},
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
						variationSettings: "'slnt' -12",
						src: ["./src/styles/font.woff2"],
					},
				]
			}
		},
	],
})
