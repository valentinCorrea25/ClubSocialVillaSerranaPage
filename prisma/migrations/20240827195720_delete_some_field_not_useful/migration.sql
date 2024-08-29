/*
  Warnings:

  - You are about to drop the column `alacena` on the `Alquiler` table. All the data in the column will be lost.
  - You are about to drop the column `freeza_Sabanas` on the `Alquiler` table. All the data in the column will be lost.

*/
-- AlterTable
ALTER TABLE "Alquiler" DROP COLUMN "alacena",
DROP COLUMN "freeza_Sabanas";
