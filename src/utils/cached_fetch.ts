import { createHash } from "node:crypto";
import fs from "node:fs/promises";

export const dogfetch = async (url: string, ttl_secs: number) => {
	const hash = createHash("md5").update(url).digest("hex");
	const cache_dir = `${process.cwd()}/.cache`;
	await fs.mkdir(cache_dir, { recursive: true }).catch(() => {});

	const files = await fs.readdir(cache_dir, { withFileTypes: true });
	const cached_file = files.find(file => file.name.startsWith(hash));

	if (cached_file) {
		const file_expiry = cached_file.name.split("-")[1] || "0";
		if (Date.now() < parseInt(file_expiry, 10)) {
			const file = await fs.readFile(`${cache_dir}/${cached_file.name}`);
			return new Response(file as BodyInit);
		}
	}

	const res = await fetch(url);
	const data = await res.arrayBuffer();
	const expiry = Date.now() + ttl_secs * 1000;

	await fs.writeFile(`${cache_dir}/${hash}-${expiry}`, Buffer.from(data));

	return new Response(data, {
		status: res.status,
		statusText: res.statusText,
		headers: res.headers,
	});
};
