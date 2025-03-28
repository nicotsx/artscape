import { type } from 'arktype';

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
  }),
});
