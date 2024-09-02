-- CreateTable
CREATE TABLE `Report` (
    `id` INTEGER NOT NULL AUTO_INCREMENT,
    `fromDate` DATETIME(3) NOT NULL,
    `toDate` DATETIME(3) NOT NULL,
    `place` VARCHAR(255) NOT NULL,
    `material` VARCHAR(255) NOT NULL,
    `supplier` LONGTEXT NOT NULL,
    `transporter` LONGTEXT NOT NULL,

    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;
