-- DropForeignKey
ALTER TABLE `accountdata` DROP FOREIGN KEY `AccountData_id_fkey`;

-- CreateIndex
CREATE INDEX `accountdata_email_idx` ON `accountdata`(`email`);

-- AddForeignKey
ALTER TABLE `accountdata` ADD CONSTRAINT `accountdata_id_fkey` FOREIGN KEY (`id`) REFERENCES `userdetail`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;
