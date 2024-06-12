/*
  Warnings:

  - You are about to drop the column `userDetailId` on the `transaction` table. All the data in the column will be lost.
  - Added the required column `buyerDetailId` to the `transaction` table without a default value. This is not possible if the table is not empty.

*/
-- DropForeignKey
ALTER TABLE `transaction` DROP FOREIGN KEY `transaction_userDetailId_fkey`;

-- AlterTable
ALTER TABLE `transaction` DROP COLUMN `userDetailId`,
    ADD COLUMN `buyerDetailId` INTEGER NOT NULL;

-- AddForeignKey
ALTER TABLE `transaction` ADD CONSTRAINT `transaction_buyerDetailId_fkey` FOREIGN KEY (`buyerDetailId`) REFERENCES `userdetail`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;
