-- CreateTable
CREATE TABLE `AccountData` (
    `id` INTEGER NOT NULL AUTO_INCREMENT,
    `fullName` VARCHAR(191) NOT NULL,
    `email` VARCHAR(191) NOT NULL,
    `password` VARCHAR(191) NOT NULL,
    `type` VARCHAR(191) NOT NULL,
    `noPhone` VARCHAR(191) NOT NULL,
    `updatedAt` DATETIME(3) NOT NULL,
    `createdAt` DATETIME(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3),

    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `UserDetail` (
    `id` INTEGER NOT NULL AUTO_INCREMENT,
    `promoId` INTEGER NULL,
    `point` INTEGER NOT NULL DEFAULT 0,
    `referalCode` VARCHAR(191) NULL,
    `yourReferalCode` VARCHAR(191) NULL,
    `expReferealCode` DATETIME(3) NOT NULL,

    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- AddForeignKey
ALTER TABLE `AccountData` ADD CONSTRAINT `AccountData_id_fkey` FOREIGN KEY (`id`) REFERENCES `UserDetail`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;
