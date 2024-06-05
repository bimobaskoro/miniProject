/*
  Warnings:

  - A unique constraint covering the columns `[categoryEvent]` on the table `EventDetail` will be added. If there are existing duplicate values, this will fail.

*/
-- CreateIndex
CREATE UNIQUE INDEX `EventDetail_categoryEvent_key` ON `EventDetail`(`categoryEvent`);
