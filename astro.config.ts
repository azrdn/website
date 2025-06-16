import { defineConfig } from "astro/config";
import { rehypeHeadingIds } from '@astrojs/markdown-remark';

import heading_links from 'rehype-autolink-headings'
import sitemap from "@astrojs/sitemap";

export default defineConfig({
	site: "https://azrd.dev",
	integrations: [ sitemap() ],
	server: { host: true },
	build: { format: "preserve", assets: "static" },
	markdown: {
		rehypePlugins: [
			rehypeHeadingIds,
			[heading_links, {
				behavior: "append",
				content: { type: "text", value: "#" },
				properties: { tabIndex: -1 }
			}]
		],
		shikiConfig: {
			defaultColor: false,
			themes: {
				dark: "catppuccin-macchiato",
				light: 'github-light',
			}
		}
	},
	experimental: {
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
					}
				],
				fallbacks: ["monospace"],
				cssVariable: "--font-subset",
			}
		]
	}
});
