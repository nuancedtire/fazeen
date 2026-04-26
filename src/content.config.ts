import { defineCollection, z } from "astro:content";
import { glob } from "astro/loaders";

const work = defineCollection({
	loader: glob({ pattern: "**/*.{md,mdx}", base: "./src/content/work" }),
	schema: z.object({
		title: z.string(),
		tagline: z.string(),
		role: z.string(),
		period: z.string(),
		status: z.string(),
		stack: z.array(z.string()),
		links: z.object({ live: z.string().optional(), github: z.string().optional() }).optional(),
		order: z.number(),
		featured: z.boolean().default(false),
	}),
});

export const collections = { work };
