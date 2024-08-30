/*
  Warnings:

  - Added the required column `ubicacion` to the `Actividad` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "Actividad" ADD COLUMN     "ubicacion" TEXT NOT NULL;
