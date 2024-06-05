/*
  Warnings:

  - Made the column `eventDetailId` on table `postevent` required. This step will fail if there are existing NULL values in that column.

*/
-- DropForeignKey
ALTER TABLE `postevent` DROP FOREIGN KEY `postevent_eventDetailId_fkey`;

-- AlterTable
ALTER TABLE `postevent` MODIFY `eventDetailId` INTEGER NOT NULL;

-- AddForeignKey
ALTER TABLE `postevent` ADD CONSTRAINT `postevent_eventDetailId_fkey` FOREIGN KEY (`eventDetailId`) REFERENCES `EventDetail`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;
