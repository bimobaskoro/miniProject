-- CreateTable
CREATE TABLE `accountdata` (
    `id` INTEGER NOT NULL AUTO_INCREMENT,
    `fullName` VARCHAR(191) NOT NULL,
    `email` VARCHAR(191) NOT NULL,
    `password` VARCHAR(191) NOT NULL,
    `is_verified` BOOLEAN NOT NULL DEFAULT false,
    `type` ENUM('user', 'admin') NOT NULL,
    `noPhone` VARCHAR(191) NOT NULL,
    `updatedAt` DATETIME(3) NOT NULL,
    `createdAt` DATETIME(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3),

    UNIQUE INDEX `accountdata_email_key`(`email`),
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

-- CreateTable
CREATE TABLE `events` (
    `id` INTEGER NOT NULL AUTO_INCREMENT,
    `adminId` INTEGER NOT NULL,
    `title` VARCHAR(191) NOT NULL,
    `status` ENUM('Publish', 'Hidden') NOT NULL,
    `category` ENUM('Concert', 'Expo', 'Play', 'Workshop', 'Sport') NOT NULL,
    `location` VARCHAR(191) NOT NULL,
    `imgEvent` MEDIUMBLOB NULL,
    `imgSeat` MEDIUMBLOB NULL,
    `date` VARCHAR(191) NOT NULL,
    `startTime` VARCHAR(191) NOT NULL,
    `finishTime` VARCHAR(191) NOT NULL,
    `city` ENUM('Jakarta', 'Bogor', 'Depok', 'Tangerang', 'Bekasi') NOT NULL,
    `desc` VARCHAR(191) NOT NULL,
    `promo` DOUBLE NULL,
    `updatedAt` DATETIME(3) NOT NULL,
    `createdAt` DATETIME(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3),

    UNIQUE INDEX `events_title_key`(`title`),
    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `eventprice` (
    `id` INTEGER NOT NULL AUTO_INCREMENT,
    `categoryEvent` VARCHAR(191) NULL,
    `qty` INTEGER NOT NULL,
    `price` DOUBLE NOT NULL,
    `updatedAt` DATETIME(3) NOT NULL,
    `createdAt` DATETIME(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3),
    `eventId` INTEGER NULL,

    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `transaction` (
    `id` INTEGER NOT NULL AUTO_INCREMENT,
    `buyerId` INTEGER NOT NULL,
    `buyerDetailId` INTEGER NOT NULL,
    `eventId` INTEGER NOT NULL,
    `eventPriceId` INTEGER NOT NULL,
    `status` ENUM('Pending', 'Paid') NOT NULL,
    `createdAt` DATETIME(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3),
    `totalQty` INTEGER NOT NULL,
    `totalPrice` DOUBLE NOT NULL,

    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- AddForeignKey
ALTER TABLE `accountdata` ADD CONSTRAINT `accountdata_id_fkey` FOREIGN KEY (`id`) REFERENCES `userdetail`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `events` ADD CONSTRAINT `events_adminId_fkey` FOREIGN KEY (`adminId`) REFERENCES `accountdata`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `eventprice` ADD CONSTRAINT `eventprice_eventId_fkey` FOREIGN KEY (`eventId`) REFERENCES `events`(`id`) ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `transaction` ADD CONSTRAINT `transaction_buyerId_fkey` FOREIGN KEY (`buyerId`) REFERENCES `accountdata`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `transaction` ADD CONSTRAINT `transaction_buyerDetailId_fkey` FOREIGN KEY (`buyerDetailId`) REFERENCES `userdetail`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `transaction` ADD CONSTRAINT `transaction_eventId_fkey` FOREIGN KEY (`eventId`) REFERENCES `events`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `transaction` ADD CONSTRAINT `transaction_eventPriceId_fkey` FOREIGN KEY (`eventPriceId`) REFERENCES `eventprice`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;
