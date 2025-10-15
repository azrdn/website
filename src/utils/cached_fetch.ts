import { createHash } from "node:crypto"
import fs from "node:fs/promises"

const cache_dir = ".cache"
export default async (url: string, ttl_secs: number, init?: RequestInit) => {
	const hash = createHash("md5").update(url).digest("hex")
	await fs.mkdir(cache_dir, { recursive: true }).catch(() => {})

	const files = await fs.readdir(cache_dir, { withFileTypes: true })
	const now = Date.now()

	for (const file of files) {
		if (!file.isFile() || !file.name.startsWith(hash)) continue

		const [, expiry_str = "0"] = file.name.split("-")
		const expiry = Number.parseInt(expiry_str, 10)
		const file_path = `${cache_dir}/${file.name}`

		if (!Number.isFinite(expiry) || expiry <= now) {
			await fs.rm(file_path).catch(() => {})
			continue
		}

		const cached = await fs.readFile(file_path)
		return new Response(cached as BodyInit)
	}

	const res = await fetch(url, init)
	const data = await res.arrayBuffer()
	const expiry = Date.now() + ttl_secs * 1000

	await fs.writeFile(`${cache_dir}/${hash}-${expiry}`, Buffer.from(data))

	return new Response(data, {
		status: res.status,
		statusText: res.statusText,
		headers: res.headers,
	})
}
