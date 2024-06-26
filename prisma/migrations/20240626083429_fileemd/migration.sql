/*
  Warnings:

  - Made the column `Amount` on table `emd` required. This step will fail if there are existing NULL values in that column.

*/
-- AlterTable
ALTER TABLE `emd` MODIFY `Amount` DOUBLE NOT NULL DEFAULT 0.0;
