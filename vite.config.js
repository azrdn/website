import { defineConfig } from 'vite'
import minifyHTML from './plugin/minifyHtml'

export default defineConfig({
	appType: 'mpa',
	plugins: [minifyHTML()],
	css: {
		transformer: 'lightningcss',
		lightningcss: {
			targets: {}
		}
	}
})
