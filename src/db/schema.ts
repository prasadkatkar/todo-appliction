import { integer, sqliteTable, text } from "drizzle-orm/sqlite-core";

export const todosTable = sqliteTable("todos", {
  id: integer({
    mode: "number",
  }).primaryKey({
    autoIncrement: true,
  }),
  userId: integer()
    .notNull()
    .references(() => users.id),
  title: text().notNull(),
  description: text(),

  completed: integer({
    mode: "boolean",
  }).default(false),
  created_at: integer({
    mode: "timestamp",
  }),
  updated_at: integer({
    mode: "timestamp",
  }),
});

export const users = sqliteTable("users", {
  id: integer({
    mode: "number",
  }).primaryKey({
    autoIncrement: true,
  }),
  name: text(),
  email: text().notNull().unique(),
  password: text().notNull(),
  created_at: integer({
    mode: "timestamp",
  }),
  updated_at: integer({
    mode: "timestamp",
  }),
});
