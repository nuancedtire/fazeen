import { glob } from "astro/loaders";
import { defineCollection } from "astro:content";
import { z } from "astro/zod";

const work = defineCollection({
	loader: glob({ base: "./src/content/work", pattern: "**/*.{md,mdx}" }),
	schema: z.object({
		title: z.string(),
		tagline: z.string(),
		role: z.string(),
		period: z.string(),
		status: z.string(),
		stack: z.array(z.string()).optional(),
		links: z
			.object({
				live: z.string().url().optional(),
				github: z.string().url().optional(),
			})
			.optional(),
		cover: z.string().optional(),
		order: z.number(),
		featured: z.boolean().default(false),
	}),
});

const writing = defineCollection({
	loader: glob({ base: "./src/content/writing", pattern: "**/*.{md,mdx}" }),
	schema: z.object({
		title: z.string(),
		description: z.string(),
		pubDate: z.coerce.date(),
		draft: z.boolean().default(false),
	}),
});

export const collections = { work, writing };
