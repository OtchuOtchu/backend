/*
  Warnings:

  - You are about to drop the `Image` table. If the table is not empty, all the data it contains will be lost.
  - Added the required column `image` to the `Clothes` table without a default value. This is not possible if the table is not empty.

*/
-- DropForeignKey
ALTER TABLE `Image` DROP FOREIGN KEY `Image_clothingId_fkey`;

-- AlterTable
ALTER TABLE `Clothes` ADD COLUMN `image` VARCHAR(191) NOT NULL;

-- DropTable
DROP TABLE `Image`;
