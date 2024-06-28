/*
  Warnings:

  - You are about to alter the column `VoucherType` on the `emd` table. The data in that column could be lost. The data in that column will be cast from `VarChar(255)` to `VarChar(191)`.
  - You are about to alter the column `Type` on the `emd` table. The data in that column could be lost. The data in that column will be cast from `VarChar(255)` to `VarChar(191)`.
  - You are about to alter the column `URNNumber` on the `emd` table. The data in that column could be lost. The data in that column will be cast from `VarChar(255)` to `VarChar(191)`.
  - You are about to alter the column `StatusOfRefunded` on the `emd` table. The data in that column could be lost. The data in that column will be cast from `VarChar(255)` to `VarChar(191)`.
  - You are about to alter the column `NPNumbers` on the `emd` table. The data in that column could be lost. The data in that column will be cast from `VarChar(255)` to `VarChar(191)`.
  - You are about to alter the column `Section` on the `emd` table. The data in that column could be lost. The data in that column will be cast from `VarChar(255)` to `VarChar(191)`.
  - You are about to alter the column `Remarks` on the `emd` table. The data in that column could be lost. The data in that column will be cast from `VarChar(255)` to `VarChar(191)`.
  - You are about to drop the `Report` table. If the table is not empty, all the data it contains will be lost.

*/
-- AlterTable
ALTER TABLE `emd` MODIFY `Date` DATETIME(3) NOT NULL,
    MODIFY `VoucherType` VARCHAR(191) NOT NULL,
    MODIFY `Amount` DOUBLE NULL DEFAULT 0.0,
    MODIFY `Type` VARCHAR(191) NOT NULL,
    MODIFY `URNNumber` VARCHAR(191) NOT NULL,
    MODIFY `StatusOfRefunded` VARCHAR(191) NOT NULL,
    MODIFY `RefundedDate` DATETIME(3) NOT NULL,
    MODIFY `NPNumbers` VARCHAR(191) NOT NULL,
    MODIFY `PartyName` VARCHAR(191) NOT NULL,
    MODIFY `NameOfWork` VARCHAR(191) NOT NULL,
    MODIFY `Section` VARCHAR(191) NOT NULL,
    MODIFY `Remarks` VARCHAR(191) NOT NULL;

-- DropTable
DROP TABLE `Report`;
