/*
  Warnings:

  - The primary key for the `Actividad` table will be changed. If it partially fails, the table could be left without primary key constraint.
  - You are about to drop the column `categoriaId` on the `Actividad` table. All the data in the column will be lost.
  - You are about to drop the column `id_Publicacion` on the `Actividad` table. All the data in the column will be lost.
  - The primary key for the `Alquiler` table will be changed. If it partially fails, the table could be left without primary key constraint.
  - You are about to drop the column `categoriaId` on the `Alquiler` table. All the data in the column will be lost.
  - You are about to drop the column `id_Publicacion` on the `Alquiler` table. All the data in the column will be lost.
  - The primary key for the `EventosNoticia` table will be changed. If it partially fails, the table could be left without primary key constraint.
  - You are about to drop the column `categoriaId` on the `EventosNoticia` table. All the data in the column will be lost.
  - You are about to drop the column `id_Publicacion` on the `EventosNoticia` table. All the data in the column will be lost.
  - The primary key for the `Restaurant` table will be changed. If it partially fails, the table could be left without primary key constraint.
  - You are about to drop the column `Titulo` on the `Restaurant` table. All the data in the column will be lost.
  - You are about to drop the column `categoriaId` on the `Restaurant` table. All the data in the column will be lost.
  - You are about to drop the column `id_Publicacion` on the `Restaurant` table. All the data in the column will be lost.
  - The primary key for the `Servicios` table will be changed. If it partially fails, the table could be left without primary key constraint.
  - You are about to drop the column `categoriaId` on the `Servicios` table. All the data in the column will be lost.
  - You are about to drop the column `id_Publicacion` on the `Servicios` table. All the data in the column will be lost.
  - You are about to drop the `Categoria` table. If the table is not empty, all the data it contains will be lost.
  - A unique constraint covering the columns `[id_Actividad]` on the table `Actividad` will be added. If there are existing duplicate values, this will fail.
  - A unique constraint covering the columns `[id_Alquiler]` on the table `Alquiler` will be added. If there are existing duplicate values, this will fail.
  - A unique constraint covering the columns `[id_EventoNoticia]` on the table `EventosNoticia` will be added. If there are existing duplicate values, this will fail.
  - A unique constraint covering the columns `[id_Restaurant]` on the table `Restaurant` will be added. If there are existing duplicate values, this will fail.
  - A unique constraint covering the columns `[id_Servicio]` on the table `Servicios` will be added. If there are existing duplicate values, this will fail.
  - Added the required column `id_Actividad` to the `Actividad` table without a default value. This is not possible if the table is not empty.
  - Added the required column `id_Alquiler` to the `Alquiler` table without a default value. This is not possible if the table is not empty.
  - Added the required column `id_EventoNoticia` to the `EventosNoticia` table without a default value. This is not possible if the table is not empty.
  - Added the required column `id_Restaurant` to the `Restaurant` table without a default value. This is not possible if the table is not empty.
  - Added the required column `titulo` to the `Restaurant` table without a default value. This is not possible if the table is not empty.
  - Added the required column `id_Servicio` to the `Servicios` table without a default value. This is not possible if the table is not empty.

*/
-- DropForeignKey
ALTER TABLE "Actividad" DROP CONSTRAINT "Actividad_categoriaId_fkey";

-- DropForeignKey
ALTER TABLE "Alquiler" DROP CONSTRAINT "Alquiler_categoriaId_fkey";

-- DropForeignKey
ALTER TABLE "EventosNoticia" DROP CONSTRAINT "EventosNoticia_categoriaId_fkey";

-- DropForeignKey
ALTER TABLE "Restaurant" DROP CONSTRAINT "Restaurant_categoriaId_fkey";

-- DropForeignKey
ALTER TABLE "Servicios" DROP CONSTRAINT "Servicios_categoriaId_fkey";

-- AlterTable
ALTER TABLE "Actividad" DROP CONSTRAINT "Actividad_pkey",
DROP COLUMN "categoriaId",
DROP COLUMN "id_Publicacion",
ADD COLUMN     "id_Actividad" INTEGER NOT NULL;

-- AlterTable
ALTER TABLE "Alquiler" DROP CONSTRAINT "Alquiler_pkey",
DROP COLUMN "categoriaId",
DROP COLUMN "id_Publicacion",
ADD COLUMN     "id_Alquiler" INTEGER NOT NULL;

-- AlterTable
ALTER TABLE "EventosNoticia" DROP CONSTRAINT "EventosNoticia_pkey",
DROP COLUMN "categoriaId",
DROP COLUMN "id_Publicacion",
ADD COLUMN     "id_EventoNoticia" INTEGER NOT NULL;

-- AlterTable
ALTER TABLE "Restaurant" DROP CONSTRAINT "Restaurant_pkey",
DROP COLUMN "Titulo",
DROP COLUMN "categoriaId",
DROP COLUMN "id_Publicacion",
ADD COLUMN     "id_Restaurant" INTEGER NOT NULL,
ADD COLUMN     "titulo" TEXT NOT NULL;

-- AlterTable
ALTER TABLE "Servicios" DROP CONSTRAINT "Servicios_pkey",
DROP COLUMN "categoriaId",
DROP COLUMN "id_Publicacion",
ADD COLUMN     "id_Servicio" INTEGER NOT NULL;

-- DropTable
DROP TABLE "Categoria";

-- CreateTable
CREATE TABLE "Usuario" (
    "id" SERIAL NOT NULL,

    CONSTRAINT "Usuario_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "Usuario_id_key" ON "Usuario"("id");

-- CreateIndex
CREATE UNIQUE INDEX "Actividad_id_Actividad_key" ON "Actividad"("id_Actividad");

-- CreateIndex
CREATE UNIQUE INDEX "Alquiler_id_Alquiler_key" ON "Alquiler"("id_Alquiler");

-- CreateIndex
CREATE UNIQUE INDEX "EventosNoticia_id_EventoNoticia_key" ON "EventosNoticia"("id_EventoNoticia");

-- CreateIndex
CREATE UNIQUE INDEX "Restaurant_id_Restaurant_key" ON "Restaurant"("id_Restaurant");

-- CreateIndex
CREATE UNIQUE INDEX "Servicios_id_Servicio_key" ON "Servicios"("id_Servicio");
