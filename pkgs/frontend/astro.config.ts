import { defineConfig, envField, fontProviders } from "astro/config";
import mdx from "@astrojs/mdx";
import sitemap from "@astrojs/sitemap";
import cloudflare from "@astrojs/cloudflare";
import { satteri, satteriHeadingIdsPlugin } from '@astrojs/markdown-satteri';
import plugins from "./src/utils/satteri.plugins"

export default defineConfig({
	adapter: cloudflare({ imageService: "passthrough" }),
	site: "https://azrd.dev",
	integrations: [sitemap(), mdx()],
	server: { host: true },
	build: { assets: "static", format: "directory" },
	trailingSlash: "always",
	env: {
		schema: {
			REPO_URL: envField.string({
				context: "server",
				access: "public",
				url: true,
			}),
			BACKEND_URL: envField.string({
				context: "client",
				access: "public",
				url: true,
			}),
		},
		validateSecrets: true,
	},
	markdown: {
		processor: satteri({
			hastPlugins: [
				satteriHeadingIdsPlugin(),
				...plugins,
			],
		}),
		shikiConfig: {
			defaultColor: false,
			themes: {
				dark: "catppuccin-macchiato",
				light: "catppuccin-latte",
			},
		},
	},
	fonts: [
		{
			provider: fontProviders.local(),
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
