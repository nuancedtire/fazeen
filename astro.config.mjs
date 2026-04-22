// @ts-check
import { defineConfig, fontProviders } from "astro/config";
import mdx from "@astrojs/mdx";
import sitemap from "@astrojs/sitemap";
import cloudflare from "@astrojs/cloudflare";
import tailwindcss from "@tailwindcss/vite";

export default defineConfig({
	site: "https://fazeen.dev",
	integrations: [mdx(), sitemap()],
	adapter: cloudflare({
		platformProxy: {
			enabled: true,
		},
	}),
	vite: {
		plugins: [tailwindcss()],
	},
	experimental: {
		fonts: [
			{
				provider: fontProviders.fontsource(),
				name: "Inter Variable",
				cssVariable: "--font-inter",
				weights: [400, 500, 600, 700],
				styles: ["normal"],
				fallbacks: ["sans-serif"],
			},
			{
				provider: fontProviders.fontsource(),
				name: "Instrument Serif",
				cssVariable: "--font-instrument-serif",
				weights: [400],
				styles: ["normal", "italic"],
				fallbacks: ["serif"],
			},
			{
				provider: fontProviders.fontsource(),
				name: "JetBrains Mono Variable",
				cssVariable: "--font-jetbrains-mono",
				weights: [400, 500],
				styles: ["normal"],
				fallbacks: ["monospace"],
			},
		],
	},
});
