-- AlterTable
ALTER TABLE "Actividad" ALTER COLUMN "horario" DROP NOT NULL,
ALTER COLUMN "ubicacion" DROP NOT NULL;

-- AlterTable
ALTER TABLE "Restaurant" ALTER COLUMN "coordenadas" DROP NOT NULL,
ALTER COLUMN "ubicacion" DROP NOT NULL,
ALTER COLUMN "horario_semanal" DROP NOT NULL,
ALTER COLUMN "horario_finde" DROP NOT NULL,
ALTER COLUMN "domingo" DROP NOT NULL,
ALTER COLUMN "facebook" DROP NOT NULL,
ALTER COLUMN "instagram" DROP NOT NULL,
ALTER COLUMN "web" DROP NOT NULL;

-- AlterTable
ALTER TABLE "Servicio" ALTER COLUMN "horario" DROP NOT NULL;
