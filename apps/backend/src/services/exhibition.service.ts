import { eq } from 'drizzle-orm';
import { HarvardApiClient } from '../clients/harvard-api-client';
import { UnsplashApiClient } from '../clients/unsplash-api-client';
import { exhibitionsTable, venuesTable } from '../core/db/schema';
import { db, env } from '../core/env/env';

/**
 * This function fetches the current exhibitions from the database.
 */
const getExhibitions = async () => {
  const exhibitions = await db.query.exhibitionsTable.findMany({ with: { venue: true } });
  return exhibitions;
};

/**
 * This function fetches a single exhibition from the database.
 * @param id The ID of the exhibition to fetch.
 */
const getExhibition = async (id: number) => {
  const exhibition = await db.query.exhibitionsTable.findFirst({ where: eq(exhibitionsTable.id, id), with: { venue: true } });
  return exhibition;
};

/**
 * This function fetches the current exhibitions from the Harvard API and stores them in the database.
 * If an exhibition already exists in the database, it will be updated with the latest information.
 */
const fetchExhibitions = async () => {
  const harvardClient = new HarvardApiClient(env.HARVARD_API_KEY);
  const unsplashClient = new UnsplashApiClient(env.UNSPLASH_ACCESS_KEY);

  const apiExhibition = await harvardClient.getCurrentExhibitions();

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

    // Try to get an image from Unsplash if no poster is available
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
