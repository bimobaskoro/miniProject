/*
  Warnings:

  - A unique constraint covering the columns `[email]` on the table `accountdata` will be added. If there are existing duplicate values, this will fail.

*/
-- CreateIndex
CREATE UNIQUE INDEX `accountdata_email_key` ON `accountdata`(`email`);
