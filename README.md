# React + Vite

This template provides a minimal setup to get React working in Vite with HMR and some ESLint rules.

Currently, two official plugins are available:

- [@vitejs/plugin-react](https://github.com/vitejs/vite-plugin-react/blob/main/packages/plugin-react) uses [Oxc](https://oxc.rs)
- [@vitejs/plugin-react-swc](https://github.com/vitejs/vite-plugin-react/blob/main/packages/plugin-react-swc) uses [SWC](https://swc.rs/)

## React Compiler

The React Compiler is not enabled on this template because of its impact on dev & build performances. To add it, see [this documentation](https://react.dev/learn/react-compiler/installation).

## Expanding the ESLint configuration

If you are developing a production application, we recommend using TypeScript with type-aware lint rules enabled. Check out the [TS template](https://github.com/vitejs/vite/tree/main/packages/create-vite/template-react-ts) for information on how to integrate TypeScript and [`typescript-eslint`](https://typescript-eslint.io) in your project.

**Integration & Deployment**

- **Purpose:** This frontend expects a JSON API that exposes a `GET /api/models/` endpoint which returns an array of model objects. Each model should have at least: `id`, `name`, `profile`, `main_image` (URL), and `photos` (array of `{ id, image }`).
- **Backend (Django + Railway):** Deploy the Django REST API to Railway and ensure the live API serves `/api/models/` with Cloudinary image URLs.
- **Cloudinary:** Configure Cloudinary in the Django backend. Use either `CLOUDINARY_URL` or `CLOUDINARY_CLOUD_NAME`, `CLOUDINARY_API_KEY`, and `CLOUDINARY_API_SECRET` as Railway environment variables.
- **Frontend (Vercel):** Deploy this app to Vercel and set `VITE_API_URL` to your Railway backend base URL.
- **Fallback behavior:** If `VITE_API_URL` is not configured, the frontend currently falls back to `https://api-project-production-257e.up.railway.app`.

### Production checklist

1. Deploy Django API on Railway and confirm `GET /api/models/` returns valid JSON with image URLs.
2. Set Railway env vars:
   - `SECRET_KEY`
   - `DEBUG=False`
   - `ALLOWED_HOSTS=localhost,127.0.0.1,.railway.app`
   - `CORS_ALLOWED_ORIGINS=http://localhost:5173,http://127.0.0.1:5173,http://localhost:3000,http://127.0.0.1:3000,https://photo-gallery-bxtt9s8yt-vasco6.vercel.app`
   - `CSRF_TRUSTED_ORIGINS=https://api-project-production-257e.up.railway.app`
   - `CLOUDINARY_URL` or Cloudinary credentials
   - `DATABASE_URL`
   - `SESSION_COOKIE_SECURE=True`
   - `CSRF_COOKIE_SECURE=True`
   - `SECURE_SSL_REDIRECT=True`
3. Deploy the React app on Vercel and add `VITE_API_URL=https://api-project-production-257e.up.railway.app`.
4. Build and verify the frontend; the live frontend should fetch model data from the Railway backend.

If you want, I can also add a matching backend README or a dedicated deployment checklist file for the Django app.
