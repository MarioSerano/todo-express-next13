import { drizzle } from "drizzle-orm/postgres-js";
import { migrate } from "drizzle-orm/postgres-js/migrator";
import postgres from "postgres";

import * as dotenv from "dotenv";
dotenv.config({ path: ".env" });

const CONNECTION_STRING = `postgresql://${process.env.POSTGRES_USERNAME}:${process.env.POSTGRES_PASSWORD}@${process.env.POSTGRES_HOST}:${process.env.POSTGRES_PORT}/${process.env.POSTGRES_DB_NAME}`;
const client = postgres(CONNECTION_STRING);
const db = drizzle(client);

(async function main() {
  try {
    await migrate(db, { migrationsFolder: "./drizzle" });
    console.log("migration successful");
    process.exit();
  } catch {
    console.log("migration failed");
  }
})();
