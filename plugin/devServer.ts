import path from 'path'

const server = Bun.serve({
    async fetch(req) {
        let requestPath = new URL(req.url).pathname
        if (requestPath.endsWith('/')) requestPath += 'index.html'
        const combinedPath = path.join(process.argv[2] ?? '', requestPath)
        return new Response(Bun.file(combinedPath))
    },
    error(request) {
        console.error(request.code, request.message)
        return new Response('Not found lol', { status: 404 })
    },
    port: 0,
})

console.log(`Server started at ${server.url}`)