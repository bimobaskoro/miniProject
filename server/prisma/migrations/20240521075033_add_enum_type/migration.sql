/*
  Warnings:

  - You are about to alter the column `type` on the `accountdata` table. The data in that column could be lost. The data in that column will be cast from `VarChar(191)` to `Enum(EnumId(0))`.

*/
-- AlterTable
ALTER TABLE `accountdata` MODIFY `type` ENUM('user', 'admin') NOT NULL;
