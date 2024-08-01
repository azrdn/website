import path from 'path';

const initialDir = path.join(process.cwd(), process.argv[2] ?? '')

const server = Bun.serve({
    async fetch(req) {
        let requestPath = new URL(req.url).pathname;
        if (requestPath.endsWith('/')) requestPath += 'index.html';
        const systemPath = path.join(initialDir, requestPath);
        return new Response(Bun.file(systemPath));
    },
    error(request) {
        console.error(request)
        return new Response('Not found lol', { status: 404 })
    },
    port: 0,
});

console.log(`Server started at ${server.url}`);