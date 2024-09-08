import { minify } from "@minify-html/node";
import type { File } from "../build";

function minifyPlugin(file: File): Buffer {
    if (file.ext === ".html") {
        return minify(file.buf, {
            minify_css: false,
            minify_js: false
        })
    } else {
        return file.buf
    }
}

export { minifyPlugin }
