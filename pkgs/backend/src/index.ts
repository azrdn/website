import { Hono } from "hono";
import { cors } from "hono/cors";
import { sValidator } from "@hono/standard-validator";
import z from "zod";

import { drizzle } from "drizzle-orm/postgres-js";
import { lt, desc } from "drizzle-orm";
import { table } from "../db/schema";

const stringToNum = z.preprocess(
	(val: string) => Number.parseInt(val, 10),
	z.number().positive(),
);

const app = new Hono()
	.use(cors({ origin: process.env.FRONTEND_URL }))
	.get("/", (c) => c.text("OK", 200))
	.get(
		"/guestbook",
		sValidator("query", z.object({
			from: stringToNum.optional(),
			limit: stringToNum,
		})),
		async ({ req, json }) => {
			const db = drizzle(process.env.DATABASE_URL);
			const { from, limit } = req.valid("query");
			const res = await db
				.select()
				.from(table)
				.where(from ? lt(table.id, from) : undefined)
				.orderBy(desc(table.id))
				.limit(limit)
			return json(res, 200);
		},
	)
	.post(
		"/guestbook",
		sValidator(
			"form",
			z.object({
				username: z.string().min(1).max(20),
				message: z.string().min(5).max(100),
				url: z.url().or(z.literal("")),
			}),
		),
		async ({ req, json, redirect }) => {
			const db = drizzle(process.env.DATABASE_URL)
			const fetchMode = req.header("sec-fetch-mode")
			const res = await db
				.insert(table)
				.values(req.valid("form"))
				.returning({ id: table.id });

			if (fetchMode !== "navigate") return json(res[0], 201);
			return redirect(`${process.env.FRONTEND_URL}/guestbook`, 303);
		},
	)

export default app;
export type App = typeof app;
