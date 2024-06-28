/*
  Warnings:

  - You are about to drop the column `Amount` on the `emd` table. All the data in the column will be lost.
  - You are about to drop the column `Date` on the `emd` table. All the data in the column will be lost.
  - You are about to drop the column `NPNumbers` on the `emd` table. All the data in the column will be lost.
  - You are about to drop the column `NameOfWork` on the `emd` table. All the data in the column will be lost.
  - You are about to drop the column `PartyName` on the `emd` table. All the data in the column will be lost.
  - You are about to drop the column `RefundedDate` on the `emd` table. All the data in the column will be lost.
  - You are about to drop the column `Remarks` on the `emd` table. All the data in the column will be lost.
  - You are about to drop the column `Section` on the `emd` table. All the data in the column will be lost.
  - You are about to drop the column `StatusOfRefunded` on the `emd` table. All the data in the column will be lost.
  - You are about to drop the column `Type` on the `emd` table. All the data in the column will be lost.
  - You are about to drop the column `URNNumber` on the `emd` table. All the data in the column will be lost.
  - You are about to drop the column `VoucherType` on the `emd` table. All the data in the column will be lost.
  - You are about to drop the `Report` table. If the table is not empty, all the data it contains will be lost.
  - Added the required column `date` to the `emd` table without a default value. This is not possible if the table is not empty.
  - Added the required column `nameOfWork` to the `emd` table without a default value. This is not possible if the table is not empty.
  - Added the required column `npNumbers` to the `emd` table without a default value. This is not possible if the table is not empty.
  - Added the required column `partyName` to the `emd` table without a default value. This is not possible if the table is not empty.
  - Added the required column `remarks` to the `emd` table without a default value. This is not possible if the table is not empty.
  - Added the required column `section` to the `emd` table without a default value. This is not possible if the table is not empty.
  - Added the required column `statusOfRefunded` to the `emd` table without a default value. This is not possible if the table is not empty.
  - Added the required column `type` to the `emd` table without a default value. This is not possible if the table is not empty.
  - Added the required column `urnNumber` to the `emd` table without a default value. This is not possible if the table is not empty.
  - Added the required column `voucherType` to the `emd` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE `emd` DROP COLUMN `Amount`,
    DROP COLUMN `Date`,
    DROP COLUMN `NPNumbers`,
    DROP COLUMN `NameOfWork`,
    DROP COLUMN `PartyName`,
    DROP COLUMN `RefundedDate`,
    DROP COLUMN `Remarks`,
    DROP COLUMN `Section`,
    DROP COLUMN `StatusOfRefunded`,
    DROP COLUMN `Type`,
    DROP COLUMN `URNNumber`,
    DROP COLUMN `VoucherType`,
    ADD COLUMN `amount` DOUBLE NULL DEFAULT 0.0,
    ADD COLUMN `date` DATETIME(3) NOT NULL,
    ADD COLUMN `nameOfWork` LONGTEXT NOT NULL,
    ADD COLUMN `npNumbers` VARCHAR(255) NOT NULL,
    ADD COLUMN `partyName` LONGTEXT NOT NULL,
    ADD COLUMN `refundedDate` DATETIME(3) NULL,
    ADD COLUMN `remarks` VARCHAR(255) NOT NULL,
    ADD COLUMN `section` VARCHAR(255) NOT NULL,
    ADD COLUMN `statusOfRefunded` VARCHAR(255) NOT NULL,
    ADD COLUMN `type` VARCHAR(255) NOT NULL,
    ADD COLUMN `urnNumber` VARCHAR(255) NOT NULL,
    ADD COLUMN `voucherType` VARCHAR(255) NOT NULL;

-- DropTable
DROP TABLE `Report`;
