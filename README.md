# vaibhav2

## SEO & Indexing

This simple Flask site now includes basic search engine optimization features:

* **Dynamic robots.txt** and **sitemap.xml** routes served at `/robots.txt` and `/sitemap.xml` respectively. The static `robots.txt` file at the root can be updated with your production domain.
* Meta tags (description, keywords, Open Graph, Twitter) added to `templates/base.html` with overridable Jinja blocks in each page template.
* Canonical links and `index,follow` robots directive.
* Additional routes (`/about`, `/contact`) to help crawlers discover anchored sections.

To customize:

1. Replace the placeholder domain in `robots.txt` and any hard‑coded URLs with your real site URL.
2. Edit the meta description/keywords blocks in your templates to match the content on each page.
3. Extend the `sitemap()` view if you add new static pages or blueprints.
