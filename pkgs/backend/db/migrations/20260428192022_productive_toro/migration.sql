CREATE TABLE "guestbook" (
	"id" integer PRIMARY KEY GENERATED ALWAYS AS IDENTITY (sequence name "guestbook_id_seq" INCREMENT BY 1 MINVALUE 1 MAXVALUE 2147483647 START WITH 1 CACHE 1),
	"username" text NOT NULL,
	"url" text,
	"message" text NOT NULL,
	"created_at" timestamp DEFAULT now()
);
