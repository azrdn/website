import { defineCollection } from "astro:content"
import { glob } from "astro/loaders"
import { z } from "astro/zod"

import { cmdLoader } from "@utils/cmd.loader"

const blog_schema = z.object({
	title: z.string().min(1, "Title cannot be empty"),
	createdAt: z.iso.datetime().transform(v => new Date(v)),
	updatedAt: z.iso.datetime().transform(v => new Date(v)).optional(),
	bskyPostUri: z.string().optional()
})

export const collections = {
	test_blog: defineCollection({
		loader: glob({ pattern: "**/*.{md,mdx}", base: "./src/test/posts" }),
		schema: blog_schema
	}),
	blog: defineCollection({
		loader: glob({ pattern: "**/*.{md,mdx}", base: "../posts" }),
		schema: blog_schema
	}),
	gitInfo: defineCollection({
		loader: cmdLoader([
			"git rev-parse --short HEAD",
			"git show -s --format=%ct HEAD"
		]),
	})
}
