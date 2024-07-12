/*
  Warnings:

  - You are about to drop the `Report` table. If the table is not empty, all the data it contains will be lost.

*/
-- DropTable
DROP TABLE `Report`;

-- CreateTable
CREATE TABLE `emd` (
    `id` INTEGER NOT NULL AUTO_INCREMENT,
    `date` DATETIME(3) NOT NULL,
    `voucherType` VARCHAR(255) NOT NULL,
    `amount` DOUBLE NULL DEFAULT 0.0,
    `type` VARCHAR(255) NOT NULL,
    `urnNumber` VARCHAR(255) NOT NULL,
    `statusOfRefunded` VARCHAR(255) NOT NULL,
    `refundedDate` DATETIME(3) NULL,
    `npNumbers` VARCHAR(255) NOT NULL,
    `partyName` LONGTEXT NOT NULL,
    `nameOfWork` LONGTEXT NOT NULL,
    `section` VARCHAR(255) NOT NULL,
    `remarks` VARCHAR(255) NOT NULL,

    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;
