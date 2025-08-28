import type { APIRoute } from "astro";

const BOMB_SIZE = import.meta.env.DEV ? "1K" : "10G";
const is_malicious = (pathname: string): boolean => {
	return (
		pathname.startsWith("/wp-") ||
		pathname.includes(".php") ||
		pathname.includes(".env")
	);
};

const check_encoding = (header: string | null) => {
	if (header?.includes("br")) return "br"
	if (header?.includes("gzip")) return "gzip"
	return null
}

export const prerender = false;
export const GET: APIRoute = async ({ request, locals, redirect }) => {
	const url = new URL(request.url);

	if (!is_malicious(url.pathname)) return redirect("/404", 301);
	const encoding = check_encoding(request.headers.get("accept-encoding"))
	if (!encoding) return redirect("https://hel1-speed.hetzner.com/10GB.bin", 301)

	const zip_bomb = await locals.runtime.env.ASSETS.fetch(
		`${url.origin}/zipbomb/${BOMB_SIZE}.${encoding}`,
	);

	return new Response(zip_bomb.body, {
		headers: { "Content-Encoding": encoding },
	});
};
