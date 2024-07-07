// modified from https://github.com/wojtekmaj/vite-plugin-simple-html/blob/main/src/minifyPlugin.ts
// Just the html minifying without ts export bs

import { minify } from 'html-minifier-terser';

export default function() {
    return {
        name: 'minifyHTML',
        apply: 'build',
        transformIndexHtml: {
            order: 'post',
            handler: async (html) => await minify(html, {
                collapseWhitespace: true,
                keepClosingSlash: true,
                removeComments: true,
                removeRedundantAttributes: true,
                removeScriptTypeAttributes: true,
                removeStyleLinkTypeAttributes: true,
                useShortDoctype: true,
                decodeEntities: true,
                removeOptionalTags: true
            })
        }
    }
}
