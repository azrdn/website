import cloudflare from "@astrojs/cloudflare";
import { cacheCloudflare } from "@astrojs/cloudflare/cache";
import { satteri } from "@astrojs/markdown-satteri";
import mdx from "@astrojs/mdx";
import sitemap from "@astrojs/sitemap";
import { defineConfig, envField, fontProviders } from "astro/config";
import { hastPlugins } from "./src/utils/satteri.plugins";

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
			}),
			DATABASE_URL: envField.string({
				context: "server",
				access: "public",
			}),
		},
		validateSecrets: true,
	},
	vite: {
		optimizeDeps: {
			include: [
				"bsky-comments",
				"astro/zod",
				"astro/assets/services/noop",
				"astro/env/runtime",
				"astro/container",
				"@astrojs/cloudflare/cache/provider",
				"takumi-js/response",
				"drizzle-orm",
				"drizzle-orm/pg-core",
				"drizzle-orm/postgres-js",
			],
		},
	},
	markdown: {
		processor: satteri({
			hastPlugins,
			features: {
				smartPunctuation: false,
				gfm: {
					footnotes: {
						backContent: "↑",
					},
				},
			},
		}),
		shikiConfig: {
			defaultColor: false,
			themes: {
				dark: "catppuccin-mocha",
				light: "catppuccin-latte",
			},
		},
	},
	cache: {
		provider: cacheCloudflare(),
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
