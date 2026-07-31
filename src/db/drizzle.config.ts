import { defineConfig } from "drizzle-kit";

export default defineConfig({
	out: "./src/db/migrations",
	schema: "./src/db/schema.ts",
	dialect: "postgresql",
	dbCredentials: {
		// biome-ignore lint/style/noNonNullAssertion: env file
		url: process.env.DATABASE_URL!,
	},
});
