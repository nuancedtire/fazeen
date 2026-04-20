import { defineCollection, z } from "astro:content";
import { glob } from "astro/loaders";

const writing = defineCollection({
	loader: glob({ pattern: "**/*.{md,mdx}", base: "./src/content/writing" }),
	schema: z.object({
		title: z.string(),
		description: z.string(),
		pubDate: z.coerce.date(),
		draft: z.boolean().default(false),
	}),
});

const work = defineCollection({
	loader: glob({ pattern: "**/*.{md,mdx}", base: "./src/content/work" }),
	schema: z.object({
		title: z.string(),
		tagline: z.string(),
		role: z.string(),
		period: z.string(),
		status: z.string(),
		stack: z.array(z.string()),
		links: z.record(z.string()).optional(),
		order: z.number(),
		featured: z.boolean().default(false),
	}),
});

export const collections = { writing, work };
