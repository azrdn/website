import { sql } from "drizzle-orm";
import * as t from "drizzle-orm/sqlite-core";

export const guestbook_tbl = t.sqliteTable("guestbook", {
	id: t.integer("id").primaryKey({ autoIncrement: true }),
	username: t.text().notNull(),
	url: t.text(),
	message: t.text().notNull(),
	created_at: t.text('timestamp')
    	.notNull()
    	.default(sql`(current_timestamp)`),
});

export type GuestbookEntry = typeof guestbook_tbl.$inferSelect;
