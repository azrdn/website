import { readdir } from "fs/promises";
import p from "path";
import { minifyPlugin } from "./plugins/minifyHtml";

import type { Dirent } from "fs"
export type File = {
    buf: Buffer,
    ext: string,
}

const inputDir = process.argv[2] ?? "."
const outputDir = process.argv[3] ?? './dist'

async function build(files: Dirent[], plugins?: Function[]) {
    for (const entry of files) {
        if (entry.isDirectory()) continue

        const fullInPath = p.join(entry.parentPath, entry.name)
        const blob = Bun.file(fullInPath)
        // console.log("mime :", blob.type)

        let file: File = {
            ext: p.extname(entry.name),
            buf: Buffer.from(await blob.arrayBuffer())
        }

        if (plugins) for (const func of plugins) {
            file.buf = func(file)
        }

        const fullOutPath = p.join(outputDir, p.relative(inputDir, fullInPath))
        Bun.write(fullOutPath, new Blob([file.buf]))
        // console.log("i->o :", fullInPath, "->", fullOutPath)
    }
}

const files = await readdir(inputDir, {
    recursive: true,
    withFileTypes: true
});

await build(files, [
    minifyPlugin
])