import { defineCollection, z } from 'astro:content';
import { glob } from 'astro/loaders';

const posts_path = import.meta.env.PROD ? "./posts" : "./src/test-posts"
const schema = z.object({
	title: z.string().min(1, "Title cannot be empty"),
	createdAt: z.date(),
	updatedAt: z.date().optional(),
})

export const collections = {
	blog: defineCollection({
		loader: glob({ pattern: "**/*.md", base: posts_path }),
		schema
	}),
	blog_mdx: defineCollection({
		loader: glob({ pattern: "**/*.mdx", base: posts_path }),
		schema
	})
};
