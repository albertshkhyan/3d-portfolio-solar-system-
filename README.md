# Portfolio

Interactive 3D developer portfolio built as a solar system: planets represent sections (About, Skills, Experience, Projects, etc.) with smooth camera transitions and glassmorphism UI.

## Setup

```bash
npm install
npm run dev
```

Open [http://localhost:5173](http://localhost:5173).

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

The app is deployed to **GitHub Pages** via GitHub Actions on push to `main`. Enable Pages in **Settings → Pages → Source: GitHub Actions**. Live URL: `https://<username>.github.io/<repo-name>/`.
