CREATE TABLE IF NOT EXISTS `exhibitions` (
	`id` integer PRIMARY KEY NOT NULL,
	`title` text,
	`image` text,
	`startDate` text,
	`endDate` text,
	`venueId` integer
);
--> statement-breakpoint
CREATE TABLE IF NOT EXISTS `venues` (
	`id` integer PRIMARY KEY NOT NULL,
	`name` text,
	`fullname` text,
	`city` text,
	`country` text,
	`address1` text
);
