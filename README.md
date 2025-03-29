# Local development

1. Clone the repository
2. Run `pnpm install`
3. Create a new file ./apps/backend/.dev.vars with the following content:
```ini
HARVARD_API_KEY=your_api_key
UNSPLASH_ACCESS_KEY=your_access_key (optional)
```
4. Run `pnpm dev`
5. Open your browser and navigate to `http://localhost:8080`
