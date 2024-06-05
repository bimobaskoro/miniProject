/*
  Warnings:

  - You are about to drop the column `eventDetailId` on the `postevent` table. All the data in the column will be lost.
  - You are about to drop the `eventdetail` table. If the table is not empty, all the data it contains will be lost.

*/
-- DropForeignKey
ALTER TABLE `postevent` DROP FOREIGN KEY `postevent_eventDetailId_fkey`;

-- AlterTable
ALTER TABLE `postevent` DROP COLUMN `eventDetailId`;

-- DropTable
DROP TABLE `eventdetail`;

-- CreateTable
CREATE TABLE `EventPrice` (
    `id` INTEGER NOT NULL AUTO_INCREMENT,
    `categoryEvent` VARCHAR(191) NULL,
    `qty` INTEGER NOT NULL,
    `price` DOUBLE NOT NULL,
    `updatedAt` DATETIME(3) NOT NULL,
    `createdAt` DATETIME(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3),
    `eventId` INTEGER NULL,

    UNIQUE INDEX `EventPrice_categoryEvent_key`(`categoryEvent`),
    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- AddForeignKey
ALTER TABLE `EventPrice` ADD CONSTRAINT `EventPrice_eventId_fkey` FOREIGN KEY (`eventId`) REFERENCES `postevent`(`id`) ON DELETE SET NULL ON UPDATE CASCADE;
