import contentSignals from "@components/content_signals.txt?raw";
import type { APIRoute } from "astro";

const res = await fetch(
	"https://raw.githubusercontent.com/ai-robots-txt/ai.robots.txt/refs/heads/main/robots.txt",
	{ cache: "force-cache" },
);
const aiBots = await res.text();

export const GET: APIRoute = async ({ url }) => {
	const sitemap = `Sitemap: ${new URL("sitemap-index.xml", url).href}\n`;
	return new Response(`${contentSignals}\n` + `${aiBots}\n` + `${sitemap}`);
};
