# STARS project page

Static project page for *STARS: From Spatiotemporal Dynamics to Social Representations
in Human-Robot Interaction*, built from the
[Academic Project Page Template](https://github.com/eliahuhorwitz/Academic-project-page-template)
(the same template used for the SocialNav-SUB page).

Everything is static — open `index.html` directly, or serve the folder:

```bash
python3 -m http.server 8000   # then visit http://localhost:8000
```

## Layout

```
index.html                     all page content
static/css/stars.css           page-specific styles (cards, tables, chart)
static/css/index.css           template styles (unchanged)
static/js/stars-chart.js       hover tooltips for the data-efficiency chart
static/images/method.png       Fig. 1, rendered from stars_latex/figures/method.pdf
static/images/datasets_latent.png  Fig. 2, from figures/ds-sns-legend-no-cpt.png
static/images/architecture.png Appendix architecture figure, from sup/architecture_diagram.pdf
static/pdfs/STARS.pdf          copy of STARS_arxiv.pdf
```

The main results table and the data-efficiency chart are hand-written HTML/SVG
(not screenshots), so they stay sharp and selectable. Their numbers come from
Table 1 of `stars_latex/main.tex` — update both if the table changes.

## Before publishing

Search `index.html` for `TODO`:

- the venue/subtitle line (currently "Preprint, 2026"),
- `og:url` and the BibTeX entry,
- the commented-out arXiv and Code buttons,
- personal-page links for the authors that don't have one yet,
- `static/images/favicon.ico` (inherited from the SocialNav-SUB page).

To regenerate the figures from the LaTeX sources:

```bash
pdftoppm -r 200 -png -singlefile ../stars_latex/figures/method.pdf static/images/method
pdftoppm -r 250 -png -singlefile ../stars_latex/sup/architecture_diagram.pdf static/images/architecture
convert ../stars_latex/figures/ds-sns-legend-no-cpt.png -resize 2200x -strip -quality 88 \
        static/images/datasets_latent.png
```
