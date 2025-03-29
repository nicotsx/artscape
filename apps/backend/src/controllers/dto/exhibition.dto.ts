import { type } from 'arktype';

const weatherForecastType = type({
  today: 'string?',
  tomorrow: 'string?',
});

export const getExhibitionsResponse = type({
  exhibitions: type({
    title: 'string',
    description: 'string | null',
    shortDescription: 'string | null',
    id: 'number',
    image: 'string',
    startDate: 'string',
    endDate: 'string',
    venueId: 'number',
    venue: type({
      name: 'string',
      fullname: 'string',
      city: 'string | null',
      state: 'string | null',
      country: 'string | null',
      address1: 'string | null',
      id: 'number',
    }),
    weather: type({
      today: 'number?',
      tomorrow: 'number?',
    }).optional(),
  }).array(),
});

export const getExhibitionResponse = type({
  exhibition: type({
    title: 'string',
    description: 'string | null',
    shortDescription: 'string | null',
    id: 'number',
    image: 'string',
    startDate: 'string',
    endDate: 'string',
    venueId: 'number',
    venue: type({
      name: 'string',
      fullname: 'string',
      city: 'string | null',
      state: 'string | null',
      country: 'string | null',
      address1: 'string | null',
      id: 'number',
    }),
    weather: weatherForecastType.optional(),
  }),
});
