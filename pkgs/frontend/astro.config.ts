import mdx from "@astrojs/mdx"
import sitemap from "@astrojs/sitemap"
import * as c from "astro/config"
import rehypeExtLinks from "rehype-external-links"
import minify from 'astro-minify-html-swc'

export default c.defineConfig({
	site: "https://azrd.dev",
	devToolbar: { enabled: false },
	integrations: [sitemap(), mdx(), minify()],
	server: { host: true },
	build: {
		format: "preserve",
		assets: "static",
	},
	env: {
		schema: {
			ASCII_ART_URL: c.envField.string({
				context: "server",
				access: "public",
				optional: true,
			}),
			ROBOTS_TXT_URL: c.envField.string({
				context: "server",
				access: "public",
				optional: true,
			}),
			REPO_URL: c.envField.string({
				context: "server",
				access: "public",
				optional: true,
			}),
			BACKEND_URL: c.envField.string({
				context: "client",
				access: "public",
				url: true,
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
			provider: c.fontProviders.local(),
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
