# Portfolio

Interactive 3D developer portfolio built as a solar system: planets represent sections (About, Skills, Experience, Projects, etc.) with smooth camera transitions and glassmorphism UI.

**Live:** [https://albertshkhyan.github.io/3d-portfolio-solar-system-/](https://albertshkhyan.github.io/3d-portfolio-solar-system-/)

## Setup

```bash
npm install
npm run dev
```

Open [http://localhost:5173](http://localhost:5173).

**Optional – planet textures:** For real planet images in the 3D scene and mobile nav, download the 2k textures from [Solar System Scope](https://www.solarsystemscope.com/textures/) and place them in `public/textures/` (see `public/textures/README.md` for exact filenames). Without them, the app uses solid color fallbacks.

## Scripts

| Command       | Description              |
| ------------- | ------------------------ |
| `npm run dev` | Start dev server         |
| `npm run build` | Type-check & production build |
| `npm run preview` | Preview production build |
| `npm run lint` | Run ESLint               |

## Stack

- **React** + **TypeScript**
- **Vite**
- **Tailwind CSS**
- **React Three Fiber** + **Three.js** (3D scene)
- **Framer Motion** (animations)
- **Zustand** (state)

## Deploy

The app is deployed to **GitHub Pages** via GitHub Actions on push to `main`. Enable Pages in **Settings → Pages → Source: GitHub Actions**. Live: [albertshkhyan.github.io/3d-portfolio-solar-system-](https://albertshkhyan.github.io/3d-portfolio-solar-system-/).
