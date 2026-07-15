// biome-ignore-all assist/source/organizeImports: lemme do it
import type { APIRoute } from "astro";
import { experimental_getFontFileURL, fontData } from "astro:assets";
import { experimental_AstroContainer } from "astro/container";
import { render } from "takumi-js";
import OG from "@components/main/og_image.astro"

export const GET: APIRoute = async ({ url, site }) => {
	const fontPath = fontData["--font-subset"][0]?.src[0]?.url
	if (!fontPath) throw new Error("Font not found");
	const font_url = experimental_getFontFileURL(fontPath, url);

	const container = await experimental_AstroContainer.create();
	const element = await container.renderToString(OG, {
		props: {
			title: site?.hostname,
			description: "shitty website"
		}
	})

	const image = await render(element, {
		fonts: [font_url],
		width: 1200,
		height: 630
	});

	return new Response(new Uint8Array(image));
};
