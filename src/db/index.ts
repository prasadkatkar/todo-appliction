import "dotenv/config";
import { drizzle } from "drizzle-orm/libsql";

export const db = drizzle({
  connection: {
    url: process.env.DB_URL as string,
    authToken: process.env.DB_TOKEN as string,
  },
});
