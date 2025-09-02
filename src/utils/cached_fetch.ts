import { createHash } from "node:crypto";
import fs from "node:fs/promises";

async function dogfetch(url: string, ttl_secs: number): Promise<Response> {
	const hash = createHash("md5").update(url).digest("hex");
	const cache_dir = `${process.cwd()}/.cache`;

	await fs.access(cache_dir).catch(async () => {
		await fs.mkdir(cache_dir, { recursive: true });
	})

	const dirent = await fs.readdir(cache_dir, { withFileTypes: true });
	for (const item of dirent) {
		if (item.name.startsWith(hash)) {
			const [hash, time] = item.name.split("-");
			if (!hash || !time) break;

			const expiry = parseInt(time, 10);
			if (Date.now() < expiry) {
				const file = await fs.readFile(
					`${process.cwd()}/.cache/${item.name}`,
				);
				return new Response(file as BodyInit);
			}
		}
	}

	const resp = await fetch(url);
	const data = await resp.arrayBuffer();
	const expiry = Date.now() + ttl_secs * 1000;

	await fs.writeFile(`${cache_dir}/${hash}-${expiry}`, Buffer.from(data));

	return new Response(data, {
		status: resp.status,
		statusText: resp.statusText,
		headers: resp.headers,
	});
}

export default dogfetch;
