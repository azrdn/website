import { defineCollection, z } from 'astro:content';
import { glob } from 'astro/loaders';

export const collections = {
	blog: defineCollection({
		loader: glob({ pattern: "**/*.md", base: "./posts" }),
		schema: z.object({
			title: z.string(),
			createdAt: z.date(),
			updatedAt: z.date().optional(),
		})
	})
};
