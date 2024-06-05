/*
  Warnings:

  - You are about to drop the `postevent` table. If the table is not empty, all the data it contains will be lost.

*/
-- DropForeignKey
ALTER TABLE `eventprice` DROP FOREIGN KEY `EventPrice_eventId_fkey`;

-- DropForeignKey
ALTER TABLE `postevent` DROP FOREIGN KEY `postevent_adminId_fkey`;

-- DropTable
DROP TABLE `postevent`;

-- CreateTable
CREATE TABLE `events` (
    `id` INTEGER NOT NULL AUTO_INCREMENT,
    `adminId` INTEGER NOT NULL,
    `title` VARCHAR(191) NOT NULL,
    `status` ENUM('Publish', 'Hidden') NOT NULL,
    `category` ENUM('Concert', 'Expo', 'Play', 'Workshop', 'Sport') NOT NULL,
    `location` VARCHAR(191) NOT NULL,
    `imgEvent` VARCHAR(191) NULL,
    `imgSeat` VARCHAR(191) NULL,
    `date` DATETIME(3) NOT NULL,
    `startTime` DATETIME(3) NOT NULL,
    `finishTime` DATETIME(3) NOT NULL,
    `city` ENUM('Jakarta', 'Bogor', 'Depok', 'Tangerang', 'Bekasi') NOT NULL,
    `desc` VARCHAR(191) NOT NULL,
    `promo` DOUBLE NULL,
    `updatedAt` DATETIME(3) NOT NULL,
    `createdAt` DATETIME(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3),

    UNIQUE INDEX `events_title_key`(`title`),
    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- AddForeignKey
ALTER TABLE `events` ADD CONSTRAINT `events_adminId_fkey` FOREIGN KEY (`adminId`) REFERENCES `accountdata`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `EventPrice` ADD CONSTRAINT `EventPrice_eventId_fkey` FOREIGN KEY (`eventId`) REFERENCES `events`(`id`) ON DELETE SET NULL ON UPDATE CASCADE;
