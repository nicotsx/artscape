import { type InferSelectModel, relations } from 'drizzle-orm';
import { int, sqliteTable, text } from 'drizzle-orm/sqlite-core';

export const exhibitionsTable = sqliteTable('exhibitions', {
  id: int().primaryKey(),
  title: text(),
  image: text(),
  startDate: text(),
  endDate: text(),
  venueId: int().references(() => venuesTable.id),
  shortDescription: text(),
  description: text(),
});

export const exhibitionRelations = relations(exhibitionsTable, ({ one }) => ({
  venue: one(venuesTable, {
    fields: [exhibitionsTable.venueId],
    references: [venuesTable.id],
  }),
}));

export const venuesTable = sqliteTable('venues', {
  id: int().primaryKey(),
  name: text(),
  fullname: text(),
  city: text(),
  country: text(),
  address1: text(),
});

export type Venue = InferSelectModel<typeof venuesTable>;
export type Exhibition = InferSelectModel<typeof exhibitionsTable>;
