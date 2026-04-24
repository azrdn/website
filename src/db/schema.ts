import { sql } from "drizzle-orm";
import * as t from "drizzle-orm/sqlite-core";

export const table = t.sqliteTable("guestbook", {
	id: t.integer("id").primaryKey({ autoIncrement: true }),
	username: t.text().notNull(),
	url: t.text(),
	message: t.text().notNull(),
	created_at: t.text('timestamp')
    	.notNull()
    	.default(sql`(current_timestamp)`),
});

export type GuestbookEntry = typeof table.$inferSelect;
