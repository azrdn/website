import { defineCollection } from "astro:content"
import { glob } from "astro/loaders"
import { z } from "astro/zod"

const posts_path = import.meta.env.PROD ? "./posts" : "./src/test/posts"

export const collections = {
	blog: defineCollection({
		loader: glob({ pattern: "**/*.{md,mdx}", base: posts_path }),
		schema: z.object({
			title: z.string().min(1, "Title cannot be empty"),
			createdAt: z.date(),
			updatedAt: z.date().optional(),
		})
	}),
}
