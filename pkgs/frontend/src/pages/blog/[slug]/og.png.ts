// biome-ignore-all assist/source/organizeImports: lemme do it
import type { APIRoute, GetStaticPaths } from "astro";
import { getCollection } from "astro:content";
import { experimental_getFontFileURL, fontData } from "astro:assets";
import { experimental_AstroContainer } from "astro/container";
import { ImageResponse } from "takumi-js/response";
import OG from "@components/main/og_image.astro"

export const getStaticPaths = (async () => {
	const testBlog = import.meta.env.DEV ? await getCollection("testBlog") : [];
	const blog = await getCollection("blog");
	const collection = [...testBlog, ...blog];
	return collection.map((post) => ({
		params: { slug: post.id },
		props: { post },
	}));
}) satisfies GetStaticPaths;

export const GET: APIRoute = async ({ props, url, site }) => {
	const fontPath = fontData["--font-subset"][0]?.src[0]?.url
	if (!fontPath) throw new Error("Font not found");
	const font_url = experimental_getFontFileURL(fontPath, url);

	const container = await experimental_AstroContainer.create();
	const element = await container.renderToString(OG, {
		props: {
			title: props.post.data.title,
			description: site?.hostname
		},
	})
	return new ImageResponse(element, {
		fonts: [font_url],
		width: 1200,
		height: 630
	});
};
