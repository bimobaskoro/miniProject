/*
  Warnings:

  - You are about to drop the column `buyerDetailId` on the `transaction` table. All the data in the column will be lost.

*/
-- DropForeignKey
ALTER TABLE `transaction` DROP FOREIGN KEY `transaction_buyerDetailId_fkey`;

-- AlterTable
ALTER TABLE `transaction` DROP COLUMN `buyerDetailId`,
    ADD COLUMN `userDetailId` INTEGER NULL;

-- AddForeignKey
ALTER TABLE `transaction` ADD CONSTRAINT `transaction_userDetailId_fkey` FOREIGN KEY (`userDetailId`) REFERENCES `userdetail`(`id`) ON DELETE SET NULL ON UPDATE CASCADE;
