import { drizzle } from "drizzle-orm/postgres-js";
import postgres from "postgres";

const CONNECTION_STRING = `postgresql://${process.env.POSTGRES_USERNAME}:${process.env.POSTGRES_PASSWORD}@${process.env.POSTGRES_HOST}:${process.env.POSTGRES_PORT}/${process.env.POSTGRES_DB_NAME}`;
const client = postgres(CONNECTION_STRING);
const db = drizzle(client);

export default db;
