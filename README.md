# fazeen.dev

Personal site, portfolio, and writing of **Dr Fazeen Nasser** — emergency medicine clinician at Barts Health NHS Trust and founding engineer of [Peerr.io](https://peerr.io) and [Aiigent.io](https://aiigent.io).

Live at **[fazeen.dev](https://fazeen.dev)**.

Built with [Astro](https://astro.build) and deployed on [Cloudflare Workers](https://developers.cloudflare.com/workers/static-assets/).

## Stack

- **Framework:** Astro 6 (with MDX)
- **Styling:** Tailwind CSS 4 + `@tailwindcss/typography`
- **Content:** Markdown / MDX content collections (`src/content/work`)
- **Hosting:** Cloudflare Workers via `@astrojs/cloudflare`
- **Extras:** Sitemap, RSS feed, OpenGraph metadata, observability logging

## Project Structure

```
├── public/                 # Static assets (favicons, images, og cards)
├── src/
│   ├── components/         # Reusable Astro components
│   ├── content/work/       # Case-study / project MDX entries
│   ├── layouts/            # Page layouts
│   ├── pages/              # Routes — index, about, cv, now, contact, work
│   ├── styles/             # Global styles
│   ├── consts.ts           # Site title, description, URL
│   └── content.config.ts   # Content collection schemas
├── astro.config.mjs
├── wrangler.json           # Cloudflare Workers config
└── package.json
```

Pages map directly from `src/pages/`. The `work/` collection drives the portfolio at `/work` and individual case studies at `/work/[slug]`.

## Local Development

Requires **Node.js ≥ 22**.

```bash
npm install
npm run dev          # http://localhost:4321
```

## Commands

| Command                  | Action                                                        |
| :----------------------- | :------------------------------------------------------------ |
| `npm install`            | Install dependencies                                          |
| `npm run dev`            | Start the local dev server                                    |
| `npm run build`          | Build the production site to `./dist/`                        |
| `npm run preview`        | Build then run locally with `wrangler dev` (Workers runtime)  |
| `npm run check`          | Build + `tsc` + `wrangler deploy --dry-run` (CI sanity check) |
| `npm run deploy`         | Deploy to Cloudflare Workers                                  |
| `npm run cf-typegen`     | Regenerate Cloudflare binding types                           |
| `npm run astro -- --help`| Astro CLI help                                                |

## Adding a Project / Case Study

Drop a new `.mdx` file in `src/content/work/` matching the schema in `src/content.config.ts`. It will be auto-routed to `/work/<slug>`.

## Deployment

Production deploys go to Cloudflare Workers:

```bash
npm run build && npm run deploy
```

View live logs:

```bash
npx wrangler tail
```

## Credit

Scaffolded from the [Astro blog starter](https://github.com/cloudflare/templates/tree/main/astro-blog-starter-template) (itself based on [Bear Blog](https://github.com/HermanMartinus/bearblog/)). Heavily customised since.

## License

Content (writing, case studies, images) © Fazeen Nasser. Source code available for reference; please ask before reusing wholesale.
