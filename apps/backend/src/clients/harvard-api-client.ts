import { type } from 'arktype';

const venueSchema = type({
  venueid: 'number',
  name: 'string',
  fullname: 'string',
  city: 'string | null',
  state: 'string | null',
  country: 'string | null',
  address1: 'string | null',
});

const exhibitionSchema = type({
  id: 'number',
  title: 'string',
  shortdescription: type('string | null').optional(),
  description: type('string | null').optional(),
  begindate: 'string',
  enddate: 'string',
  venues: venueSchema.array(),
  url: 'string',
  poster: type({
    imageurl: 'string?',
    caption: 'string?',
  }).optional(),
});

const exhibitionListSchema = type({
  records: exhibitionSchema.array(),
  info: {
    totalrecordsperquery: 'number',
    totalrecords: 'number',
    pages: 'number',
    page: 'number',
    next: 'string?',
  },
});

export class HarvardApiClient {
  private baseUrl = 'https://api.harvardartmuseums.org';

  constructor(private readonly apiKey?: string) {}

  async getCurrentExhibitions(params: { page?: number } = {}) {
    if (!this.apiKey) {
      throw new Error('HARVARD_API_KEY key is required to fetch from Harvard API');
    }

    const url = new URL(`${this.baseUrl}/exhibition`);
    url.searchParams.set('size', '10');
    url.searchParams.set('apikey', this.apiKey);
    url.searchParams.set('status', 'current');

    if (params.page) {
      url.searchParams.set('page', params.page.toString());
    }

    const response = await fetch(url);
    const data = await response.json();

    const parsedResponse = exhibitionListSchema(data);

    if (parsedResponse instanceof type.errors) {
      console.error('Error parsing response:', parsedResponse.summary);
      throw parsedResponse;
    }

    // Call the next page if it exists
    if (parsedResponse.info.next) {
      const nextPage = Number.parseInt(new URL(parsedResponse.info.next).searchParams.get('page') || '1', 10);
      const nextData = await this.getCurrentExhibitions({ page: nextPage });
      parsedResponse.records.push(...nextData.records);
    }

    return parsedResponse;
  }
}
