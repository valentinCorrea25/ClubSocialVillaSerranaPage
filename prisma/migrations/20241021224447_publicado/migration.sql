-- AlterTable
ALTER TABLE "Actividad" ADD COLUMN     "publicado" BOOLEAN NOT NULL DEFAULT true;

-- AlterTable
ALTER TABLE "Alquiler" ADD COLUMN     "publicado" BOOLEAN NOT NULL DEFAULT true;

-- AlterTable
ALTER TABLE "EventosNoticia" ADD COLUMN     "publicado" BOOLEAN NOT NULL DEFAULT true;

-- AlterTable
ALTER TABLE "Restaurant" ADD COLUMN     "publicado" BOOLEAN NOT NULL DEFAULT true;

-- AlterTable
ALTER TABLE "Servicio" ADD COLUMN     "publicado" BOOLEAN NOT NULL DEFAULT true;
