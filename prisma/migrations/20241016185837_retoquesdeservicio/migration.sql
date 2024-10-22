/*
  Warnings:

  - The values [Trasporte,Cerrajero] on the enum `ServicioTitulo` will be removed. If these variants are still used in the database, this will fail.

*/
-- AlterEnum
BEGIN;
CREATE TYPE "ServicioTitulo_new" AS ENUM ('Alambrados', 'Jardineria', 'LimpiezaTerrenos', 'Construccion', 'Diseno', 'Filmacion', 'Equipamiento', 'Estetica', 'Salud', 'Mecanica', 'ProvisionDeAgua', 'Seguridad', 'Traslados');
ALTER TABLE "Servicio" ALTER COLUMN "titulo_Servicio" TYPE "ServicioTitulo_new" USING ("titulo_Servicio"::text::"ServicioTitulo_new");
ALTER TYPE "ServicioTitulo" RENAME TO "ServicioTitulo_old";
ALTER TYPE "ServicioTitulo_new" RENAME TO "ServicioTitulo";
DROP TYPE "ServicioTitulo_old";
COMMIT;
