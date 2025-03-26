import { defineConfig } from 'astro/config';

// https://astro.build/config
export default defineConfig({
	server: {
		host: true,
	},
	markdown: {
		shikiConfig: {
			theme: 'github-dark-dimmed'
		}
	}
});
