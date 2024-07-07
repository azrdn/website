import { defineConfig } from 'vite'
import { Features } from 'lightningcss'
import minifyHTML from './plugin/minifyHtml'

export default defineConfig({
	appType: 'mpa',
	plugins: [minifyHTML()],
	css: {
		transformer: 'lightningcss',
		lightningcss: {
			exclude: Features.Selectors | Features.VendorPrefixes
		}
	}
})
