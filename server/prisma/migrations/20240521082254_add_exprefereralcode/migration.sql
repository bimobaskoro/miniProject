/*
  Warnings:

  - You are about to drop the column `expReferealCode` on the `userdetail` table. All the data in the column will be lost.

*/
-- AlterTable
ALTER TABLE `userdetail` DROP COLUMN `expReferealCode`,
    ADD COLUMN `expReferalCode` DATETIME(3) NULL;
