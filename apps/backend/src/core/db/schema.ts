import { int, sqliteTable, text } from 'drizzle-orm/sqlite-core';

export const exhibitionsTable = sqliteTable('exhibitions', {
  id: int().primaryKey(),
  title: text(),
  image: text(),
  startDate: text(),
  endDate: text(),
  venueId: int(),
});

export const venuesTable = sqliteTable('venues', {
  id: int().primaryKey(),
  name: text(),
  fullname: text(),
  city: text(),
  country: text(),
  address1: text(),
});
