import { createHash } from "node:crypto"
import fs from "node:fs/promises"

const cache_dir = ".cache"
export default async (url: string, ttl_secs: number, init?: RequestInit) => {
	const hash = createHash("md5").update(url).digest("hex")
	const file_path = `${cache_dir}/${hash}`
	const stats = await fs.stat(file_path)

	if ((Date.now() - stats.mtimeMs) < (ttl_secs * 1000)) {
		const cached = await fs.readFile(file_path)
		return new Response(cached as BodyInit)
	}

	const res = await fetch(url, init)
	const data = await res.arrayBuffer()

	await fs.mkdir(cache_dir, { recursive: true })
	await fs.writeFile(file_path, new Uint8Array(data))

	return new Response(data, {
		status: res.status,
		statusText: res.statusText,
		headers: res.headers,
	})
}
