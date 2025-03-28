PRAGMA foreign_keys=OFF;--> statement-breakpoint
CREATE TABLE `__new_exhibitions` (
	`id` integer PRIMARY KEY NOT NULL,
	`title` text,
	`image` text,
	`startDate` text,
	`endDate` text,
	`venueId` integer,
	`shortDescription` text,
	`description` text,
	FOREIGN KEY (`venueId`) REFERENCES `venues`(`id`) ON UPDATE no action ON DELETE no action
);
--> statement-breakpoint
INSERT INTO `__new_exhibitions`("id", "title", "image", "startDate", "endDate", "venueId", "shortDescription", "description") SELECT "id", "title", "image", "startDate", "endDate", "venueId", "shortDescription", "description" FROM `exhibitions`;--> statement-breakpoint
DROP TABLE `exhibitions`;--> statement-breakpoint
ALTER TABLE `__new_exhibitions` RENAME TO `exhibitions`;--> statement-breakpoint
PRAGMA foreign_keys=ON;
