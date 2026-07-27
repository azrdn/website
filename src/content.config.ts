import { defineCollection } from "astro:content";
import { cmdLoader } from "@utils/cmd.loader";
import { glob } from "astro/loaders";
import { z } from "astro/zod";

const blogSchema = z.object({
	title: z.string().min(1, "Title cannot be empty"),
	bskyPostUri: z.string().optional(),
	createdAt: z.iso.datetime().transform((v) => new Date(v)),
	updatedAt: z.iso
		.datetime()
		.transform((v) => new Date(v))
		.optional(),
});

export const collections = {
	testBlog: defineCollection({
		schema: blogSchema,
		loader: glob({
			pattern: "**/*.test.{md,mdx}",
			base: "./src/content/render-tests",
		}),
	}),
	blog: defineCollection({
		schema: blogSchema,
		loader: glob({
			pattern: "**/*.{md,mdx}",
			base: "./src/content/posts",
		}),
	}),
	badges: defineCollection({
		schema: ({ image }) =>
			z.array(
				z.object({
					image: image(),
					href: z.string(),
					alt: z.string(),
				}),
			),
		loader: glob({
			pattern: "*.json",
			base: "./src/content/badges",
		}),
	}),
	gitInfo: defineCollection({
		loader: cmdLoader({
			revision: "git rev-parse --short HEAD",
			lastChange: "git show -s --format=%ct HEAD",
		}),
	}),
};
