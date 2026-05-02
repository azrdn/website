import * as t from "drizzle-orm/pg-core";

export const table = t.pgTable("guestbook", {
	id: t.integer("id").primaryKey().generatedAlwaysAsIdentity(),
	username: t.text().notNull(),
	url: t.text(),
	message: t.text().notNull(),
	created_at: t.timestamp("created_at").defaultNow().notNull(),
});
