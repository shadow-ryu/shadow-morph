import type { Config } from "drizzle-kit";

export default {
    schema: "lib/db/schema.ts",
    out: "./drizzle",
    driver: 'pg',
    dbCredentials: {
      connectionString:"postgresql://postgres:vKzvx0NS76uN0gFm@db.nnuxtkxvfeevvzckwhwn.supabase.co:5432/postgres",
    }
  } satisfies Config;