import { eq } from 'drizzle-orm';
import { HarvardApiClient } from '../clients/harvard-api-client';
import { UnsplashApiClient } from '../clients/unsplash-api-client';
import { WeatherApiClient } from '../clients/weather-api-client';
import { type Venue, exhibitionsTable, venuesTable } from '../core/db/schema';
import { db, env, kv } from '../core/env/env';

/**
 * This function fetches the current exhibitions from the database.
 */
const getExhibitions = async () => {
  console.info('Fetching current exhibitions');
  const exhibitions = await db.query.exhibitionsTable.findMany({ with: { venue: true }, where: eq(exhibitionsTable.ongoing, 1) });

  const exhibitionsWithWeather = await Promise.all(
    exhibitions.map(async (exhibition) => {
      const weather = await getExhibitionWeather(exhibition.venue);
      return {
        ...exhibition,
        weather,
      };
    }),
  );

  console.info('Fetched', exhibitionsWithWeather.length, 'exhibitions');

  return exhibitionsWithWeather;
};

/**
 * This function fetches a single exhibition from the database.
 * @param id The ID of the exhibition to fetch.
 */
const getExhibition = async (id: number) => {
  console.info('Fetching exhibition with ID:', id);
  const exhibition = await db.query.exhibitionsTable.findFirst({ where: eq(exhibitionsTable.id, id), with: { venue: true } });

  if (!exhibition) {
    return null;
  }

  const weather = await getExhibitionWeather(exhibition.venue);

  console.info('Fetched exhibition:', exhibition.title);

  return {
    ...exhibition,
    weather,
  };
};

/**
 * Get weather forecast for an exhibition venue
 * @param venue The venue object containing location information
 * @returns Weather forecast data or null if unavailable
 */
const getExhibitionWeather = async (venue: Venue | null) => {
  if (!venue || !venue.city) {
    return null;
  }

  const cacheKey = `weather:${venue.city.toLowerCase().trim()}`;
  const cachedData = await kv.get(cacheKey, 'json');

  if (cachedData) {
    return cachedData;
  }

  const weatherClient = new WeatherApiClient();
  const coords = await weatherClient.geocodeCity(venue.city);

  if (!coords) {
    return null;
  }

  const weatherData = await weatherClient.getWeatherForecast(coords.latitude, coords.longitude);

  if (weatherData) {
    await kv.put(cacheKey, JSON.stringify(weatherData), { expirationTtl: 3600 });
  }

  return weatherData;
};

/**
 * This function fetches the current exhibitions from the Harvard API and stores them in the database.
 * If an exhibition already exists in the database, it will be updated with the latest information.
 */
const fetchExhibitions = async () => {
  console.info('Fetching exhibitions from Harvard API');
  const harvardClient = new HarvardApiClient(env.HARVARD_API_KEY);
  const unsplashClient = new UnsplashApiClient(env.UNSPLASH_ACCESS_KEY);

  const apiExhibition = await harvardClient.getCurrentExhibitions();

  console.info('Fetched ', apiExhibition.records.length, 'exhibitions from Harvard API');

  await db.update(exhibitionsTable).set({ ongoing: 0 });

  for (const exhibition of apiExhibition.records) {
    const venue = exhibition.venues[0];
    if (!venue) {
      continue;
    }

    const { venueid, name, fullname, city, country, address1 } = venue;

    let dbVenue = await db.query.venuesTable.findFirst({ where: eq(venuesTable.id, venueid) });
    if (!dbVenue) {
      const [newVenue] = await db.insert(venuesTable).values({ id: venueid, name, fullname, city, country, address1 }).returning();
      dbVenue = newVenue;
    }

    const { id, title, poster, begindate, enddate, description, shortdescription } = exhibition;
    const dbExhibition = await db.query.exhibitionsTable.findFirst({ where: eq(exhibitionsTable.id, id) });

    let imageUrl = poster?.imageurl ?? dbExhibition?.image;

    if (!imageUrl) {
      const unsplashImage = await unsplashClient.searchImage(title);
      if (unsplashImage) {
        imageUrl = unsplashImage.urls.full;
      }
    }

    if (dbExhibition) {
      await db
        .update(exhibitionsTable)
        .set({
          title,
          ongoing: 1,
          image: imageUrl ?? '',
          startDate: begindate,
          endDate: enddate,
          venueId: dbVenue.id,
          description,
          shortDescription: shortdescription,
        })
        .where(eq(exhibitionsTable.id, id));
    } else {
      await db.insert(exhibitionsTable).values({
        id,
        title,
        ongoing: 1,
        image: imageUrl ?? '',
        startDate: begindate,
        endDate: enddate,
        venueId: dbVenue.id,
        description,
        shortDescription: shortdescription,
      });
    }
  }
};

export const exhibitionService = {
  getExhibitions,
  getExhibition,
  fetchExhibitions,
};
