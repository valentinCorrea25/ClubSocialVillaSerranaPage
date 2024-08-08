-- CreateEnum
CREATE TYPE "ServicioTitulo" AS ENUM ('Titulo1', 'Titulo2');

-- CreateTable
CREATE TABLE "Servicios" (
    "ID_Publicacion" SERIAL NOT NULL,
    "Id_categoria" INTEGER NOT NULL,
    "nombre_titular" TEXT NOT NULL,
    "Titulo" TEXT NOT NULL,
    "Descripcion" TEXT NOT NULL,
    "Mail" TEXT NOT NULL,
    "Celular" TEXT NOT NULL,
    "Horario" TEXT NOT NULL,
    "Dia_Semana" TEXT[],
    "titulo_Servicio" "ServicioTitulo" NOT NULL,

    CONSTRAINT "Servicios_pkey" PRIMARY KEY ("ID_Publicacion")
);

-- CreateTable
CREATE TABLE "Actividad" (
    "ID_Publicacion" SERIAL NOT NULL,
    "Id_categoria" INTEGER NOT NULL,
    "fecha_publicacion" TIMESTAMP(3) NOT NULL,
    "Titulo" TEXT NOT NULL,
    "Contenido" TEXT NOT NULL,
    "Foto" TEXT NOT NULL,
    "Horario" TEXT NOT NULL,
    "Dia_Semana" TEXT[],

    CONSTRAINT "Actividad_pkey" PRIMARY KEY ("ID_Publicacion")
);

-- CreateTable
CREATE TABLE "Eventos/Noticia" (
    "ID_Publicacion" SERIAL NOT NULL,
    "Id_categoria" INTEGER NOT NULL,
    "fecha_publicacion" TIMESTAMP(3) NOT NULL,
    "Titulo" TEXT NOT NULL,
    "Contenido" TEXT NOT NULL,
    "Foto" TEXT NOT NULL,
    "fecha_evento" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "Eventos/Noticia_pkey" PRIMARY KEY ("ID_Publicacion")
);

-- CreateTable
CREATE TABLE "CATEGORIA" (
    "ID" SERIAL NOT NULL,
    "nombre_categoria" TEXT NOT NULL,

    CONSTRAINT "CATEGORIA_pkey" PRIMARY KEY ("ID")
);

-- CreateTable
CREATE TABLE "ALQUILER" (
    "ID_Publicacion" SERIAL NOT NULL,
    "Id_categoria" INTEGER NOT NULL,
    "nombre_titular" TEXT NOT NULL,
    "Celular" TEXT NOT NULL,
    "Mail" TEXT NOT NULL,
    "Titulo" TEXT NOT NULL,
    "Descripcion" TEXT NOT NULL,
    "ubicacion" TEXT NOT NULL,
    "coordenadas" TEXT NOT NULL,
    "capacidad" INTEGER NOT NULL,
    "camas_dobles" INTEGER NOT NULL,
    "camas_singles" INTEGER NOT NULL,
    "Agua_caliente" BOOLEAN NOT NULL,
    "Toallas" BOOLEAN NOT NULL,
    "Sabanas" BOOLEAN NOT NULL,
    "TV" BOOLEAN NOT NULL,
    "WIFI" BOOLEAN NOT NULL,
    "Piscina" BOOLEAN NOT NULL,
    "Parrilla" BOOLEAN NOT NULL,
    "Bano" BOOLEAN NOT NULL,
    "Cocina" BOOLEAN NOT NULL,
    "Heladera" BOOLEAN NOT NULL,
    "Horno" BOOLEAN NOT NULL,
    "Microondas" BOOLEAN NOT NULL,
    "Alacena" BOOLEAN NOT NULL,
    "Tostadora" BOOLEAN NOT NULL,
    "aire_acondicionado" BOOLEAN NOT NULL,
    "estufa" BOOLEAN NOT NULL,
    "Frezzer" BOOLEAN NOT NULL,
    "Freeza_Sabanas" BOOLEAN NOT NULL,
    "mascotas" BOOLEAN NOT NULL,
    "Fotos" TEXT[],

    CONSTRAINT "ALQUILER_pkey" PRIMARY KEY ("ID_Publicacion")
);

-- CreateTable
CREATE TABLE "Restaurant" (
    "ID_Publicacion" SERIAL NOT NULL,
    "Id_categoria" INTEGER NOT NULL,
    "nombre_titular" TEXT NOT NULL,
    "Celular" TEXT NOT NULL,
    "Mail" TEXT NOT NULL,
    "Descripcion" TEXT NOT NULL,
    "coordenadas" TEXT NOT NULL,
    "ubicacion" TEXT NOT NULL,
    "tipo_pago" TEXT[],
    "Titulo" TEXT NOT NULL,
    "horario_semanal" TEXT NOT NULL,
    "horario_finde" TEXT NOT NULL,
    "domingo" BOOLEAN NOT NULL,
    "Instagram" TEXT NOT NULL,
    "Facebook" TEXT NOT NULL,
    "Web" TEXT NOT NULL,

    CONSTRAINT "Restaurant_pkey" PRIMARY KEY ("ID_Publicacion")
);
