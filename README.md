# Vehicle Rental and Fleet Management System

Basic front-end version (HTML + CSS only) — about 30% of the project. Static pages, no database/backend yet.

## File ownership (push these under your own GitHub account so they show in your commit history)

| Member | HTML file | CSS file |
|---|---|---|
| Member 1 (Lead) | index.html | css/home.css (+ owns css/common.css) |
| Member 2 | vehicles.html | css/vehicles.css |
| Member 3 | booking.html | css/booking.css |
| Member 4 | fleet.html | css/fleet.css |

`css/common.css` (navbar, footer, buttons, base layout) is shared and used by every page — only the Lead edits it, so nobody's commits collide.

## Branch structure

```
main   (protected, final working version only)
  └── dev   (protected, integration branch)
        ├── feature/home-page        → Member 1
        ├── feature/vehicles-page    → Member 2
        ├── feature/booking-page     → Member 3
        └── feature/fleet-page       → Member 4
```

Rule: nobody pushes directly to `main` or `dev`. Every member works on their own `feature/*` branch, then opens a Pull Request into `dev`. Once all 4 are merged into `dev` and tested together, one final PR merges `dev` into `main`.
