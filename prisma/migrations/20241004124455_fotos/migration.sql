/*
  Warnings:

  - You are about to drop the column `foto` on the `EventosNoticia` table. All the data in the column will be lost.

*/
-- AlterTable
ALTER TABLE "EventosNoticia" DROP COLUMN "foto",
ADD COLUMN     "fotos" TEXT[];
