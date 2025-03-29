import { type } from 'arktype';

const unsplashImageSchema = type({
  id: 'string',
  urls: {
    full: 'string',
  },
  alt_description: type('string | null').optional(),
  description: type('string | null').optional(),
  user: {
    name: 'string',
    username: 'string',
  },
});

const searchResponseSchema = type({
  total: 'number',
  total_pages: 'number',
  results: unsplashImageSchema.array(),
});

export class UnsplashApiClient {
  private baseUrl = 'https://api.unsplash.com';

  constructor(private readonly accessKey: string) {}

  async searchImage(query: string): Promise<typeof unsplashImageSchema.infer | null> {
    const url = new URL(`${this.baseUrl}/search/photos`);
    url.searchParams.set('query', query);
    url.searchParams.set('per_page', '1'); // We only need one image
    url.searchParams.set('orientation', 'landscape'); // Better for exhibition displays

    const response = await fetch(url, {
      headers: {
        Authorization: `Client-ID ${this.accessKey}`,
      },
    });

    if (!response.ok) {
      console.error('Error fetching from Unsplash:', response.statusText);
      return null;
    }

    const data = await response.json();
    const parsedResponse = searchResponseSchema(data);

    if (parsedResponse instanceof type.errors) {
      console.error('Error parsing Unsplash response:', parsedResponse.summary);
      return null;
    }

    return parsedResponse.results[0] || null;
  }
}
