import { defineConfig } from "drizzle-kit";

export default defineConfig({
	out: "./db/migrations",
	schema: "./db/schema.ts",
	dialect: "postgresql",
	dbCredentials: {
		// biome-ignore lint/style/noNonNullAssertion: env file
		url: process.env.DATABASE_URL!,
	},
});
