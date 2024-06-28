/*
  Warnings:

  - You are about to drop the `Report` table. If the table is not empty, all the data it contains will be lost.

*/

-- CreateTable
CREATE TABLE `emd` (
    `id` INT NOT NULL AUTO_INCREMENT,
    `Date` DATETIME NOT NULL,
    `VoucherType` VARCHAR(255) NOT NULL,
    `Amount` DOUBLE NOT NULL,
    `Type` VARCHAR(255) NOT NULL,
    `URNNumber` VARCHAR(255) NOT NULL,
    `StatusOfRefunded` VARCHAR(255) NOT NULL,
    `RefundedDate` DATETIME NOT NULL,
    `NPNumbers` VARCHAR(255) NOT NULL,
    `PartyName` LONGTEXT NOT NULL,
    `NameOfWork` LONGTEXT NOT NULL,
    `Section` VARCHAR(255) NOT NULL,
    `Remarks` VARCHAR(255) NOT NULL,

    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;