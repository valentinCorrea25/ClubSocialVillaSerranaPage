/*
  Warnings:

  - You are about to drop the `Servicios` table. If the table is not empty, all the data it contains will be lost.

*/
-- DropTable
DROP TABLE "Servicios";

-- CreateTable
CREATE TABLE "Servicio" (
    "id_Servicio" SERIAL NOT NULL,
    "nombre_titular" TEXT NOT NULL,
    "titulo" TEXT NOT NULL,
    "descripcion" TEXT NOT NULL,
    "mail" TEXT NOT NULL,
    "celular" TEXT NOT NULL,
    "horario" TEXT NOT NULL,
    "dia_Semana" TEXT[],
    "titulo_Servicio" "ServicioTitulo" NOT NULL,

    CONSTRAINT "Servicio_pkey" PRIMARY KEY ("id_Servicio")
);
