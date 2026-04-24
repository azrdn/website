import cloudflare from "@astrojs/cloudflare"
import mdx from "@astrojs/mdx"
import sitemap from "@astrojs/sitemap"
import minify from 'astro-minify-html-swc'
import rehypeExtLinks from "rehype-external-links"
import { defineConfig, envField, fontProviders } from "astro/config"

export default defineConfig({
	prefetch: false,
	site: "https://azrd.dev",
	adapter: cloudflare({
		imageService: "passthrough"
	}),
	devToolbar: {
		enabled: false,
	},
	integrations: [sitemap(), mdx(), minify()],
	server: { host: true },
	build: {
		format: "preserve",
		assets: "static",
	},
	env: {
		schema: {
			ASCII_ART_URL: envField.string({
				context: "server",
				access: "public",
			}),
			ROBOTS_TXT_URL: envField.string({
				context: "server",
				access: "public",
			}),
			REPO_URL: envField.string({
				context: "server",
				access: "public",
				default: "https://github.com/azrd/azrd.dev"
			}),
		},
		validateSecrets: true,
	},
	markdown: {
		rehypePlugins: [[rehypeExtLinks, { rel: "external nofollow" }]],
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
