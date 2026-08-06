import { DATABASE_URL } from "astro:env/server";
import { drizzle } from "drizzle-orm/postgres-js";

export const getDb = () => {
	const connection = drizzle(DATABASE_URL);
	return {
		[Symbol.asyncDispose]: async () => {
			await connection.$client.end();
		},
		connection,
	};
};
