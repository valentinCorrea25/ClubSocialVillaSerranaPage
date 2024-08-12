/*
  Warnings:

  - Added the required column `hashPass` to the `Usuario` table without a default value. This is not possible if the table is not empty.
  - Added the required column `nombre` to the `Usuario` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "Usuario" ADD COLUMN     "hashPass" TEXT NOT NULL,
ADD COLUMN     "nombre" TEXT NOT NULL;
