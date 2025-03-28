import type { GetApiExhibitionsResponse } from '~/api-client';

export type Exhibition = GetApiExhibitionsResponse['exhibitions'][number];
