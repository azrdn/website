import mdx from "@astrojs/mdx";
import sitemap from "@astrojs/sitemap";
import * as c from "astro/config";
import rehypeExtLinks from "rehype-external-links";
import minify from "astro-minify-html-swc";
import cloudflare from "@astrojs/cloudflare";

export default c.defineConfig({
	adapter: cloudflare({
		imageService: "passthrough",
	}),
	site: "https://azrd.dev",
	integrations: [sitemap(), mdx(), minify()],
	server: { host: true },
	build: { assets: "static" },
	env: {
		schema: {
			ASCII_ART_URL: c.envField.string({
				context: "server",
				access: "public",
				url: true,
			}),
			REPO_URL: c.envField.string({
				context: "server",
				access: "public",
				url: true,
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
				dark: "catppuccin-macchiato",
				light: "catppuccin-latte",
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
			name: "Ioskeley Mono",
			fallbacks: ["monospace"],
			cssVariable: "--font-subset",
			options: {
				variants: [
					{
						weight: "400 700",
						style: "normal",
						featureSettings: `"ss01"`,
						src: ["./src/styles/Ioskeley-90.woff2"],
					},
					{
						weight: "400 700",
						style: "oblique",
						featureSettings: `"ss01"`,
						variationSettings: `"slnt" -12`,
						src: ["./src/styles/Ioskeley-90.woff2"],
					},
				],
			},
		},
	],
});
