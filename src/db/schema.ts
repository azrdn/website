import { sql } from "drizzle-orm";
import * as t from "drizzle-orm/pg-core";

export const table = t.pgTable("guestbook", {
	id: t.integer("id").primaryKey().generatedAlwaysAsIdentity(),
	username: t.text().notNull(),
	url: t.text(),
	message: t.text().notNull(),
	createdAt: t
		.integer("created_at")
		.default(sql`extract(epoch from now())`)
		.notNull(),
});
