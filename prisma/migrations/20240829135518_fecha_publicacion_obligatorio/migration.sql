/*
  Warnings:

  - Added the required column `fecha_publicacion` to the `Alquiler` table without a default value. This is not possible if the table is not empty.
  - Added the required column `fecha_publicacion` to the `Restaurant` table without a default value. This is not possible if the table is not empty.
  - Added the required column `fecha_publicacion` to the `Servicio` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "Alquiler" ADD COLUMN     "fecha_publicacion" TIMESTAMP(3) NOT NULL;

-- AlterTable
ALTER TABLE "Restaurant" ADD COLUMN     "fecha_publicacion" TIMESTAMP(3) NOT NULL;

-- AlterTable
ALTER TABLE "Servicio" ADD COLUMN     "fecha_publicacion" TIMESTAMP(3) NOT NULL;
