import { boolean, pgTable, serial, text } from "drizzle-orm/pg-core";

export const users = pgTable("users", {
  id: serial("id").primaryKey(),
  username: text("username").notNull(),
  password: text("password").notNull(),
});

export const user_todos = pgTable("user_todos", {
  id: serial("id").primaryKey(),
  title: text("title"),
  description: text("description"),
  isChecked: boolean("is_checked"),
});
