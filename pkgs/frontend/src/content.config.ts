import { defineCollection } from "astro:content"
import { glob } from "astro/loaders"
import { cmdLoader } from "./utils/cmd.loader"
import { z } from "astro/zod"

const blog_schema = z.object({
	title: z.string().min(1, "Title cannot be empty"),
	createdAt: z.date(),
	updatedAt: z.date().optional(),
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
			"git show -s --format=%cd --date=format:'%Y-%m-%d %H:%M:%S' HEAD"
		]),
	})
}
