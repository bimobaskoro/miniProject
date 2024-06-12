/*
  Warnings:

  - Added the required column `buyerDetailId` to the `transaction` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE `transaction` ADD COLUMN `buyerDetailId` INTEGER NOT NULL;

-- AddForeignKey
ALTER TABLE `transaction` ADD CONSTRAINT `transaction_buyerDetailId_fkey` FOREIGN KEY (`buyerDetailId`) REFERENCES `userdetail`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;
