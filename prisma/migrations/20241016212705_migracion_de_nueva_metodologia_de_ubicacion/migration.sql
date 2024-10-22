/*
  Warnings:

  - Added the required column `ubicacion_calles` to the `Alquiler` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "Alquiler" ADD COLUMN     "ubicacion_calles" TEXT NOT NULL;

-- AlterTable
ALTER TABLE "Restaurant" ADD COLUMN     "ubicacion_calles" TEXT;
