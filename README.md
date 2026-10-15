# Eva PMU Studio — screenshot recreation

Static, framework-free recreation based on the supplied screenshot.

## Structure

```text
eva-pmu-studio/
├── index.html
├── styles.css
├── script.js
└── assets/
    ├── hero-woman.jpg
    ├── about-eva.jpg
    ├── service-ombre.jpg
    ├── service-removal.jpg
    ├── service-eye.jpg
    ├── service-shape.jpg
    ├── service-threading.jpg
    ├── result-1.jpg ... result-6.jpg
    └── results-strip.jpg
```

## Run

Open `index.html` directly in a browser, or use any static server, for example:

```bash
python -m http.server 8000
```

Then visit `http://localhost:8000`.

## Notes

- The supplied screenshot was used as the visual reference.
- Image crops in `assets/` were extracted from the supplied screenshot to keep the recreation visually close.
- The booking form is intentionally front-end-only. Connect it to Formspree, a custom API, WordPress, PHP, Firebase, Supabase, etc. for real submissions.
- Replace the extracted images with the original high-resolution photos if you have them; the CSS will keep the layout.
