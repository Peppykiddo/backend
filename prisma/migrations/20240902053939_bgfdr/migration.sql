-- CreateTable
CREATE TABLE `FD` (
    `id` INTEGER NOT NULL AUTO_INCREMENT,
    `Date` DATETIME(3) NOT NULL,
    `FDR_BG` VARCHAR(255) NOT NULL,
    `Particular` LONGTEXT NOT NULL,
    `Party_Name` LONGTEXT NOT NULL,
    `Name_of_Work` LONGTEXT NOT NULL,
    `Bank` VARCHAR(255) NOT NULL,
    `FD_Amount` DOUBLE NOT NULL,
    `BG_Amount` DOUBLE NOT NULL,
    `Refunded_Amount` DOUBLE NOT NULL,
    `Status_of_Refund` VARCHAR(255) NOT NULL,
    `Date_of_Refund` DATETIME(3) NOT NULL,
    `Bank_Issued_Date` DATETIME(3) NOT NULL,
    `Date_of_Expiry` DATETIME(3) NOT NULL,
    `FDR_Number` VARCHAR(255) NOT NULL,
    `BG_Number` VARCHAR(255) NOT NULL,
    `FD_present_Value` DOUBLE NOT NULL,
    `FD_End_Value` DOUBLE NOT NULL,
    `Section` VARCHAR(255) NOT NULL,
    `Remarks` VARCHAR(255) NOT NULL,
    `ROI` DOUBLE NOT NULL,

    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;
