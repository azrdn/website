// biome-ignore-all lint/style/noNonNullAssertion: env file
import { defineConfig } from "drizzle-kit";

export default defineConfig({
	out: "./src/db/migrations",
	schema: "./src/db/schema.ts",
	dialect: "turso",
	dbCredentials: {
		url: process.env.DATABASE_URL!,
		authToken: process.env.TURSO_AUTH_TOKEN!,
	},
});
