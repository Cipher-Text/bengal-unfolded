# Static Hosting Redirect Mapping

These are the redirects previously declared in `next.config.ts`. Next.js static export does not emit redirect rules; configure the mappings in a future static web server or edge layer.

| Source | Destination | Status |
| --- | --- | --- |
| `/{locale}/heroes` | `/{locale}/figures/` | 301 |
| `/{locale}/heroes/{id}` | `/{locale}/figures/{id}/` | 301 |
| `/{locale}/events/{slug}/heroes` | `/{locale}/events/{slug}/figures/` | 301 |
| `https://www.bengalunfolded.com/{path}` | `https://bengalunfolded.com/{path}` | 301 |
