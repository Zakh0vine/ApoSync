/*
  Warnings:

  - The values [OBAT_BEBAS] on the enum `Product_category` will be removed. If these variants are still used in the database, this will fail.
  - A unique constraint covering the columns `[code]` on the table `Product` will be added. If there are existing duplicate values, this will fail.
  - Added the required column `brand` to the `Product` table without a default value. This is not possible if the table is not empty.
  - Added the required column `code` to the `Product` table without a default value. This is not possible if the table is not empty.
  - Added the required column `entryDate` to the `Product` table without a default value. This is not possible if the table is not empty.
  - Added the required column `expiredDate` to the `Product` table without a default value. This is not possible if the table is not empty.
  - Added the required column `price` to the `Product` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE `product` ADD COLUMN `brand` VARCHAR(191) NOT NULL,
    ADD COLUMN `code` VARCHAR(191) NOT NULL,
    ADD COLUMN `entryDate` DATETIME(3) NOT NULL,
    ADD COLUMN `expiredDate` DATETIME(3) NOT NULL,
    ADD COLUMN `price` INTEGER NOT NULL,
    MODIFY `category` ENUM('OBAT_KERAS', 'OBAT_BEBAS_TERBATAS', 'KONSI', 'ALKES') NOT NULL;

-- CreateIndex
CREATE UNIQUE INDEX `Product_code_key` ON `Product`(`code`);
