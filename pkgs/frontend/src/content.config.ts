import { defineCollection } from "astro:content";
import { cmdLoader } from "@utils/cmd.loader";
import { glob } from "astro/loaders";
import { z } from "astro/zod";

const blogSchema = z.object({
	title: z.string().min(1, "Title cannot be empty"),
	createdAt: z.iso.datetime().transform((v) => new Date(v)),
	updatedAt: z.iso
		.datetime()
		.transform((v) => new Date(v))
		.optional(),
	bskyPostUri: z.string().optional(),
});

export const collections = {
	testBlog: defineCollection({
		schema: blogSchema,
		loader: glob({
			pattern: "**/*.test.{md,mdx}",
			base: "./src/content/posts",
		}),
	}),
	blog: defineCollection({
		schema: blogSchema,
		loader: glob({
			pattern: "**/*.{md,mdx}",
			base: "../posts",
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
		loader: cmdLoader([
			"git rev-parse --short HEAD",
			"git show -s --format=%ct HEAD",
		]),
	}),
};
