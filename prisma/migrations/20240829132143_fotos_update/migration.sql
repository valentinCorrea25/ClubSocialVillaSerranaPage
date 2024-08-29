/*
  Warnings:

  - You are about to drop the column `foto` on the `Actividad` table. All the data in the column will be lost.

*/
-- AlterTable
ALTER TABLE "Actividad" DROP COLUMN "foto",
ADD COLUMN     "fotos" TEXT[];

-- AlterTable
ALTER TABLE "Restaurant" ADD COLUMN     "fotos" TEXT[];
