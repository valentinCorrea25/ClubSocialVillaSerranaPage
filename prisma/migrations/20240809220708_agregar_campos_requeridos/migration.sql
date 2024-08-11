/*
  Warnings:

  - The values [Titulo1,Titulo2] on the enum `ServicioTitulo` will be removed. If these variants are still used in the database, this will fail.
  - The primary key for the `Actividad` table will be changed. If it partially fails, the table could be left without primary key constraint.
  - You are about to drop the column `Contenido` on the `Actividad` table. All the data in the column will be lost.
  - You are about to drop the column `Dia_Semana` on the `Actividad` table. All the data in the column will be lost.
  - You are about to drop the column `Foto` on the `Actividad` table. All the data in the column will be lost.
  - You are about to drop the column `Horario` on the `Actividad` table. All the data in the column will be lost.
  - You are about to drop the column `ID_Publicacion` on the `Actividad` table. All the data in the column will be lost.
  - You are about to drop the column `Id_categoria` on the `Actividad` table. All the data in the column will be lost.
  - You are about to drop the column `Titulo` on the `Actividad` table. All the data in the column will be lost.
  - The primary key for the `Restaurant` table will be changed. If it partially fails, the table could be left without primary key constraint.
  - You are about to drop the column `Celular` on the `Restaurant` table. All the data in the column will be lost.
  - You are about to drop the column `Descripcion` on the `Restaurant` table. All the data in the column will be lost.
  - You are about to drop the column `Facebook` on the `Restaurant` table. All the data in the column will be lost.
  - You are about to drop the column `ID_Publicacion` on the `Restaurant` table. All the data in the column will be lost.
  - You are about to drop the column `Id_categoria` on the `Restaurant` table. All the data in the column will be lost.
  - You are about to drop the column `Instagram` on the `Restaurant` table. All the data in the column will be lost.
  - You are about to drop the column `Mail` on the `Restaurant` table. All the data in the column will be lost.
  - You are about to drop the column `Web` on the `Restaurant` table. All the data in the column will be lost.
  - The primary key for the `Servicios` table will be changed. If it partially fails, the table could be left without primary key constraint.
  - You are about to drop the column `Celular` on the `Servicios` table. All the data in the column will be lost.
  - You are about to drop the column `Descripcion` on the `Servicios` table. All the data in the column will be lost.
  - You are about to drop the column `Dia_Semana` on the `Servicios` table. All the data in the column will be lost.
  - You are about to drop the column `Horario` on the `Servicios` table. All the data in the column will be lost.
  - You are about to drop the column `ID_Publicacion` on the `Servicios` table. All the data in the column will be lost.
  - You are about to drop the column `Id_categoria` on the `Servicios` table. All the data in the column will be lost.
  - You are about to drop the column `Mail` on the `Servicios` table. All the data in the column will be lost.
  - You are about to drop the column `Titulo` on the `Servicios` table. All the data in the column will be lost.
  - You are about to drop the `ALQUILER` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `CATEGORIA` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `Eventos/Noticia` table. If the table is not empty, all the data it contains will be lost.
  - Added the required column `categoriaId` to the `Actividad` table without a default value. This is not possible if the table is not empty.
  - Added the required column `contenido` to the `Actividad` table without a default value. This is not possible if the table is not empty.
  - Added the required column `horario` to the `Actividad` table without a default value. This is not possible if the table is not empty.
  - Added the required column `titulo` to the `Actividad` table without a default value. This is not possible if the table is not empty.
  - Added the required column `categoriaId` to the `Restaurant` table without a default value. This is not possible if the table is not empty.
  - Added the required column `celular` to the `Restaurant` table without a default value. This is not possible if the table is not empty.
  - Added the required column `descripcion` to the `Restaurant` table without a default value. This is not possible if the table is not empty.
  - Added the required column `facebook` to the `Restaurant` table without a default value. This is not possible if the table is not empty.
  - Added the required column `instagram` to the `Restaurant` table without a default value. This is not possible if the table is not empty.
  - Added the required column `mail` to the `Restaurant` table without a default value. This is not possible if the table is not empty.
  - Added the required column `web` to the `Restaurant` table without a default value. This is not possible if the table is not empty.
  - Added the required column `categoriaId` to the `Servicios` table without a default value. This is not possible if the table is not empty.
  - Added the required column `celular` to the `Servicios` table without a default value. This is not possible if the table is not empty.
  - Added the required column `descripcion` to the `Servicios` table without a default value. This is not possible if the table is not empty.
  - Added the required column `horario` to the `Servicios` table without a default value. This is not possible if the table is not empty.
  - Added the required column `mail` to the `Servicios` table without a default value. This is not possible if the table is not empty.
  - Added the required column `titulo` to the `Servicios` table without a default value. This is not possible if the table is not empty.

*/
-- AlterEnum
BEGIN;
CREATE TYPE "ServicioTitulo_new" AS ENUM ('Trasporte', 'Cerrajero');
ALTER TABLE "Servicios" ALTER COLUMN "titulo_Servicio" TYPE "ServicioTitulo_new" USING ("titulo_Servicio"::text::"ServicioTitulo_new");
ALTER TYPE "ServicioTitulo" RENAME TO "ServicioTitulo_old";
ALTER TYPE "ServicioTitulo_new" RENAME TO "ServicioTitulo";
DROP TYPE "ServicioTitulo_old";
COMMIT;

-- AlterTable
ALTER TABLE "Actividad" DROP CONSTRAINT "Actividad_pkey",
DROP COLUMN "Contenido",
DROP COLUMN "Dia_Semana",
DROP COLUMN "Foto",
DROP COLUMN "Horario",
DROP COLUMN "ID_Publicacion",
DROP COLUMN "Id_categoria",
DROP COLUMN "Titulo",
ADD COLUMN     "categoriaId" INTEGER NOT NULL,
ADD COLUMN     "contenido" TEXT NOT NULL,
ADD COLUMN     "dia_Semana" TEXT[],
ADD COLUMN     "foto" TEXT[],
ADD COLUMN     "horario" TEXT NOT NULL,
ADD COLUMN     "id_Publicacion" SERIAL NOT NULL,
ADD COLUMN     "titulo" TEXT NOT NULL,
ADD CONSTRAINT "Actividad_pkey" PRIMARY KEY ("id_Publicacion");

-- AlterTable
ALTER TABLE "Restaurant" DROP CONSTRAINT "Restaurant_pkey",
DROP COLUMN "Celular",
DROP COLUMN "Descripcion",
DROP COLUMN "Facebook",
DROP COLUMN "ID_Publicacion",
DROP COLUMN "Id_categoria",
DROP COLUMN "Instagram",
DROP COLUMN "Mail",
DROP COLUMN "Web",
ADD COLUMN     "categoriaId" INTEGER NOT NULL,
ADD COLUMN     "celular" TEXT NOT NULL,
ADD COLUMN     "descripcion" TEXT NOT NULL,
ADD COLUMN     "facebook" TEXT NOT NULL,
ADD COLUMN     "id_Publicacion" SERIAL NOT NULL,
ADD COLUMN     "instagram" TEXT NOT NULL,
ADD COLUMN     "mail" TEXT NOT NULL,
ADD COLUMN     "web" TEXT NOT NULL,
ADD CONSTRAINT "Restaurant_pkey" PRIMARY KEY ("id_Publicacion");

-- AlterTable
ALTER TABLE "Servicios" DROP CONSTRAINT "Servicios_pkey",
DROP COLUMN "Celular",
DROP COLUMN "Descripcion",
DROP COLUMN "Dia_Semana",
DROP COLUMN "Horario",
DROP COLUMN "ID_Publicacion",
DROP COLUMN "Id_categoria",
DROP COLUMN "Mail",
DROP COLUMN "Titulo",
ADD COLUMN     "categoriaId" INTEGER NOT NULL,
ADD COLUMN     "celular" TEXT NOT NULL,
ADD COLUMN     "descripcion" TEXT NOT NULL,
ADD COLUMN     "dia_Semana" TEXT[],
ADD COLUMN     "horario" TEXT NOT NULL,
ADD COLUMN     "id_Publicacion" SERIAL NOT NULL,
ADD COLUMN     "mail" TEXT NOT NULL,
ADD COLUMN     "titulo" TEXT NOT NULL,
ADD CONSTRAINT "Servicios_pkey" PRIMARY KEY ("id_Publicacion");

-- DropTable
DROP TABLE "ALQUILER";

-- DropTable
DROP TABLE "CATEGORIA";

-- DropTable
DROP TABLE "Eventos/Noticia";

-- CreateTable
CREATE TABLE "EventosNoticia" (
    "id_Publicacion" SERIAL NOT NULL,
    "fecha_publicacion" TIMESTAMP(3) NOT NULL,
    "titulo" TEXT NOT NULL,
    "contenido" TEXT NOT NULL,
    "foto" TEXT NOT NULL,
    "fecha_evento" TIMESTAMP(3) NOT NULL,
    "categoriaId" INTEGER NOT NULL,

    CONSTRAINT "EventosNoticia_pkey" PRIMARY KEY ("id_Publicacion")
);

-- CreateTable
CREATE TABLE "Categoria" (
    "id" SERIAL NOT NULL,
    "nombre_categoria" TEXT NOT NULL,

    CONSTRAINT "Categoria_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Alquiler" (
    "id_Publicacion" SERIAL NOT NULL,
    "nombre_titular" TEXT NOT NULL,
    "celular" TEXT NOT NULL,
    "mail" TEXT NOT NULL,
    "titulo" TEXT NOT NULL,
    "descripcion" TEXT NOT NULL,
    "ubicacion" TEXT NOT NULL,
    "coordenadas" TEXT NOT NULL,
    "capacidad" INTEGER NOT NULL,
    "camas_dobles" INTEGER NOT NULL,
    "camas_singles" INTEGER NOT NULL,
    "agua_caliente" BOOLEAN NOT NULL,
    "toallas" BOOLEAN NOT NULL,
    "sabanas" BOOLEAN NOT NULL,
    "tv" BOOLEAN NOT NULL,
    "wifi" BOOLEAN NOT NULL,
    "piscina" BOOLEAN NOT NULL,
    "parrilla" BOOLEAN NOT NULL,
    "bano" BOOLEAN NOT NULL,
    "cocina" BOOLEAN NOT NULL,
    "heladera" BOOLEAN NOT NULL,
    "horno" BOOLEAN NOT NULL,
    "microondas" BOOLEAN NOT NULL,
    "alacena" BOOLEAN NOT NULL,
    "tostadora" BOOLEAN NOT NULL,
    "aire_acondicionado" BOOLEAN NOT NULL,
    "estufa" BOOLEAN NOT NULL,
    "frezzer" BOOLEAN NOT NULL,
    "freeza_Sabanas" BOOLEAN NOT NULL,
    "mascotas" BOOLEAN NOT NULL,
    "fotos" TEXT[],
    "categoriaId" INTEGER NOT NULL,

    CONSTRAINT "Alquiler_pkey" PRIMARY KEY ("id_Publicacion")
);

-- AddForeignKey
ALTER TABLE "Servicios" ADD CONSTRAINT "Servicios_categoriaId_fkey" FOREIGN KEY ("categoriaId") REFERENCES "Categoria"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Actividad" ADD CONSTRAINT "Actividad_categoriaId_fkey" FOREIGN KEY ("categoriaId") REFERENCES "Categoria"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "EventosNoticia" ADD CONSTRAINT "EventosNoticia_categoriaId_fkey" FOREIGN KEY ("categoriaId") REFERENCES "Categoria"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Alquiler" ADD CONSTRAINT "Alquiler_categoriaId_fkey" FOREIGN KEY ("categoriaId") REFERENCES "Categoria"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Restaurant" ADD CONSTRAINT "Restaurant_categoriaId_fkey" FOREIGN KEY ("categoriaId") REFERENCES "Categoria"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
