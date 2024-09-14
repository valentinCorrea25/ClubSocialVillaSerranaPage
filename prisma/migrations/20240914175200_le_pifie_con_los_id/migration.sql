/*
  Warnings:

  - The primary key for the `Actividad` table will be changed. If it partially fails, the table could be left without primary key constraint.
  - You are about to drop the column `id_Actividad` on the `Actividad` table. All the data in the column will be lost.
  - The primary key for the `Alquiler` table will be changed. If it partially fails, the table could be left without primary key constraint.
  - You are about to drop the column `id_Alquiler` on the `Alquiler` table. All the data in the column will be lost.
  - The primary key for the `EventosNoticia` table will be changed. If it partially fails, the table could be left without primary key constraint.
  - You are about to drop the column `id_EventoNoticia` on the `EventosNoticia` table. All the data in the column will be lost.
  - The primary key for the `Restaurant` table will be changed. If it partially fails, the table could be left without primary key constraint.
  - You are about to drop the column `id_Restaurant` on the `Restaurant` table. All the data in the column will be lost.
  - The primary key for the `Servicio` table will be changed. If it partially fails, the table could be left without primary key constraint.
  - You are about to drop the column `id_Servicio` on the `Servicio` table. All the data in the column will be lost.

*/
-- AlterTable
ALTER TABLE "Actividad" DROP CONSTRAINT "Actividad_pkey",
DROP COLUMN "id_Actividad",
ADD COLUMN     "id" SERIAL NOT NULL,
ADD CONSTRAINT "Actividad_pkey" PRIMARY KEY ("id");

-- AlterTable
ALTER TABLE "Alquiler" DROP CONSTRAINT "Alquiler_pkey",
DROP COLUMN "id_Alquiler",
ADD COLUMN     "id" SERIAL NOT NULL,
ADD COLUMN     "precio" DECIMAL(65,30),
ADD CONSTRAINT "Alquiler_pkey" PRIMARY KEY ("id");

-- AlterTable
ALTER TABLE "EventosNoticia" DROP CONSTRAINT "EventosNoticia_pkey",
DROP COLUMN "id_EventoNoticia",
ADD COLUMN     "id" SERIAL NOT NULL,
ADD CONSTRAINT "EventosNoticia_pkey" PRIMARY KEY ("id");

-- AlterTable
ALTER TABLE "Restaurant" DROP CONSTRAINT "Restaurant_pkey",
DROP COLUMN "id_Restaurant",
ADD COLUMN     "id" SERIAL NOT NULL,
ADD CONSTRAINT "Restaurant_pkey" PRIMARY KEY ("id");

-- AlterTable
ALTER TABLE "Servicio" DROP CONSTRAINT "Servicio_pkey",
DROP COLUMN "id_Servicio",
ADD COLUMN     "id" SERIAL NOT NULL,
ADD CONSTRAINT "Servicio_pkey" PRIMARY KEY ("id");
