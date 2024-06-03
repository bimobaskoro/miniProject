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
CREATE TABLE `postevent` (
    `id` INTEGER NOT NULL AUTO_INCREMENT,
    `adminId` INTEGER NOT NULL,
    `title` VARCHAR(191) NOT NULL,
    `seatName` VARCHAR(191) NULL,
    `status` ENUM('Publish', 'Hidden') NOT NULL,
    `category` ENUM('Concert', 'Expo', 'Play', 'Workshop', 'Sport') NOT NULL,
    `location` VARCHAR(191) NOT NULL,
    `imgEvent` VARCHAR(191) NULL,
    `date` DATETIME(3) NOT NULL,
    `startTime` DATETIME(3) NOT NULL,
    `finishTime` DATETIME(3) NOT NULL,
    `city` ENUM('Jakarta', 'Bogor', 'Depok', 'Tangerang', 'Bekasi') NOT NULL,
    `desc` VARCHAR(191) NOT NULL,
    `updatedAt` DATETIME(3) NOT NULL,
    `createdAt` DATETIME(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3),

    UNIQUE INDEX `postevent_title_key`(`title`),
    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `seat` (
    `id` INTEGER NOT NULL AUTO_INCREMENT,
    `adminId` INTEGER NOT NULL,
    `nameSeat` VARCHAR(191) NOT NULL,
    `imgSeat` VARCHAR(191) NULL,
    `updatedAt` DATETIME(3) NOT NULL,
    `createdAt` DATETIME(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3),

    UNIQUE INDEX `seat_nameSeat_key`(`nameSeat`),
    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `seatdetail` (
    `id` INTEGER NOT NULL AUTO_INCREMENT,
    `seatType` VARCHAR(191) NOT NULL,
    `maxSeat` DOUBLE NOT NULL,
    `price` DOUBLE NOT NULL,
    `promo` DOUBLE NULL,
    `promoPrice` DOUBLE NULL,
    `updatedAt` DATETIME(3) NOT NULL,
    `createdAt` DATETIME(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3),
    `seatId` INTEGER NULL,

    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- AddForeignKey
ALTER TABLE `accountdata` ADD CONSTRAINT `accountdata_id_fkey` FOREIGN KEY (`id`) REFERENCES `userdetail`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `postevent` ADD CONSTRAINT `postevent_adminId_fkey` FOREIGN KEY (`adminId`) REFERENCES `accountdata`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `postevent` ADD CONSTRAINT `postevent_seatName_fkey` FOREIGN KEY (`seatName`) REFERENCES `seat`(`nameSeat`) ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `seat` ADD CONSTRAINT `seat_adminId_fkey` FOREIGN KEY (`adminId`) REFERENCES `accountdata`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `seatdetail` ADD CONSTRAINT `seatdetail_seatId_fkey` FOREIGN KEY (`seatId`) REFERENCES `seat`(`id`) ON DELETE SET NULL ON UPDATE CASCADE;
