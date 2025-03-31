# Artscape 🎨

Artscape is a modern art exhibition exploration application that allows users to discover popular ongoing exhibitions around the world. The data is provided by the Harvard Art Museum API

## Technology Stack

### Backend

- **Hono**: Lightweight, ultrafast web framework for Cloudflare Workers
- **Drizzle ORM**: Lightweight, type-safe SQL ORM
- **OpenAPI/Swagger**: API documentation and client generation

### Frontend

- **React Router 7**: Modern, data-centric framework for React
- **Tailwind CSS 4**: Utility-first CSS framework
- **Motion**: Animation library for smooth UI transitions
- **TypeScript**: For type safety and improved developer experience

### Infrastructure

- **Cloudflare Workers**: Edge computing platform for serverless functions
- **Cloudflare D1**: Serverless SQLite database
- **Cloudflare KV**: Key-value storage for caching and data persistence

### Third-party APIs

- **Harvard Art Museums API**: Provides access to the museum's collections and exhibitions
- **Unsplash API**: Provides access to high-quality images for exhibitions
- **Cloudinary**: Image hosting and transformation service

## Project Structure

```
artscape/
├── apps/
│   ├── frontend/      # React frontend application
│   └── backend/       # Hono-based API running on Cloudflare Workers
├── workers/           # Cloudflare Workers entrypoint
├── drizzle/           # Database migrations and schema
└── ...
```

## Local Development

1. Clone the repository
2. Run `pnpm install`
3. Create a new file ./apps/backend/.dev.vars with the following content:

```ini
HARVARD_API_KEY=your_api_key
UNSPLASH_ACCESS_KEY=your_access_key (optional)
```

4. Run `pnpm dev`
5. Open your browser and navigate to `http://localhost:8080`
