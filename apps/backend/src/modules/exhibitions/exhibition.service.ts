import { eq } from 'drizzle-orm';
import { exhibitionsTable, venuesTable } from '../../core/db/schema';
import { db, env } from '../../core/env/env';
import { HarvardApiClient } from './harvard-api-client';

const getExhibitions = async () => {
  const exhibitions = await db.query.exhibitionsTable.findMany({ with: { venue: true } });
  return exhibitions;
};

const fetchExhibitions = async () => {
  db.delete(exhibitionsTable);
  db.delete(venuesTable);
  const client = new HarvardApiClient(env.HARVARD_API_KEY);
  const apiExhibition = await client.getCurrentExhibitions();

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

    if (dbExhibition) {
      await db
        .update(exhibitionsTable)
        .set({
          title,
          image: poster?.imageurl ?? '',
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
        image: poster?.imageurl ?? '',
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
  fetchExhibitions,
};
