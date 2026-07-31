# JobPilot Frontend

React 19 + Vite frontend of JobPilot. For the full project documentation (features, tech stack, Docker/CI setup, API overview), see the [root README](../../README.md).

## Development

```bash
npm install
npm run dev      # Vite dev server, http://localhost:5173
npm run build    # Production build
npm run lint     # ESLint
npm run preview  # Preview the production build locally
```

By default the frontend talks to the production backend on Render. To use a local backend instead, set in `.env.local`:

```env
VITE_API_URL=http://localhost:3001/api
```
