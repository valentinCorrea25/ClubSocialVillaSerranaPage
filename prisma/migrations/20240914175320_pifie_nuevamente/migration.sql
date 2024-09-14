/*
  Warnings:

  - The primary key for the `Actividad` table will be changed. If it partially fails, the table could be left without primary key constraint.
  - You are about to drop the column `id` on the `Actividad` table. All the data in the column will be lost.
  - The primary key for the `Alquiler` table will be changed. If it partially fails, the table could be left without primary key constraint.
  - You are about to drop the column `id` on the `Alquiler` table. All the data in the column will be lost.
  - The primary key for the `EventosNoticia` table will be changed. If it partially fails, the table could be left without primary key constraint.
  - You are about to drop the column `id` on the `EventosNoticia` table. All the data in the column will be lost.
  - The primary key for the `Restaurant` table will be changed. If it partially fails, the table could be left without primary key constraint.
  - You are about to drop the column `id` on the `Restaurant` table. All the data in the column will be lost.
  - The primary key for the `Servicio` table will be changed. If it partially fails, the table could be left without primary key constraint.
  - You are about to drop the column `id` on the `Servicio` table. All the data in the column will be lost.

*/
-- AlterTable
ALTER TABLE "Actividad" DROP CONSTRAINT "Actividad_pkey",
DROP COLUMN "id",
ADD COLUMN     "id_Actividad" SERIAL NOT NULL,
ADD CONSTRAINT "Actividad_pkey" PRIMARY KEY ("id_Actividad");

-- AlterTable
ALTER TABLE "Alquiler" DROP CONSTRAINT "Alquiler_pkey",
DROP COLUMN "id",
ADD COLUMN     "id_Alquiler" SERIAL NOT NULL,
ADD CONSTRAINT "Alquiler_pkey" PRIMARY KEY ("id_Alquiler");

-- AlterTable
ALTER TABLE "EventosNoticia" DROP CONSTRAINT "EventosNoticia_pkey",
DROP COLUMN "id",
ADD COLUMN     "id_EventoNoticia" SERIAL NOT NULL,
ADD CONSTRAINT "EventosNoticia_pkey" PRIMARY KEY ("id_EventoNoticia");

-- AlterTable
ALTER TABLE "Restaurant" DROP CONSTRAINT "Restaurant_pkey",
DROP COLUMN "id",
ADD COLUMN     "id_Restaurant" SERIAL NOT NULL,
ADD CONSTRAINT "Restaurant_pkey" PRIMARY KEY ("id_Restaurant");

-- AlterTable
ALTER TABLE "Servicio" DROP CONSTRAINT "Servicio_pkey",
DROP COLUMN "id",
ADD COLUMN     "id_Servicio" SERIAL NOT NULL,
ADD CONSTRAINT "Servicio_pkey" PRIMARY KEY ("id_Servicio");
