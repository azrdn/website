CREATE TABLE `guestbook` (
	`id` integer PRIMARY KEY AUTOINCREMENT NOT NULL,
	`username` text NOT NULL,
	`url` text,
	`message` text NOT NULL,
	`timestamp` text DEFAULT (current_timestamp) NOT NULL
);
