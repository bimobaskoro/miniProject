-- CreateTable
CREATE TABLE `accountdata` (
    `id` INTEGER NOT NULL AUTO_INCREMENT,
    `fullName` VARCHAR(191) NOT NULL,
    `email` VARCHAR(191) NOT NULL,
    `password` VARCHAR(191) NOT NULL,
    `type` ENUM('user', 'admin') NOT NULL,
    `noPhone` VARCHAR(191) NOT NULL,
    `updatedAt` DATETIME(3) NOT NULL,
    `createdAt` DATETIME(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3),

    INDEX `accountdata_email_idx`(`email`),
    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `userdetail` (
    `id` INTEGER NOT NULL AUTO_INCREMENT,
    `promoId` INTEGER NULL,
    `point` INTEGER NOT NULL DEFAULT 0,
    `referalCode` VARCHAR(191) NULL,
    `yourReferalCode` VARCHAR(191) NULL,
    `expReferalCode` DATETIME(3) NULL,

    UNIQUE INDEX `userdetail_yourReferalCode_key`(`yourReferalCode`),
    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- AddForeignKey
ALTER TABLE `accountdata` ADD CONSTRAINT `accountdata_id_fkey` FOREIGN KEY (`id`) REFERENCES `userdetail`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;
