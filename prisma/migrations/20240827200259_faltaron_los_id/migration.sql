-- DropIndex
DROP INDEX "Actividad_id_Actividad_key";

-- DropIndex
DROP INDEX "Alquiler_id_Alquiler_key";

-- DropIndex
DROP INDEX "EventosNoticia_id_EventoNoticia_key";

-- DropIndex
DROP INDEX "Restaurant_id_Restaurant_key";

-- DropIndex
DROP INDEX "Servicios_id_Servicio_key";

-- AlterTable
CREATE SEQUENCE actividad_id_actividad_seq;
ALTER TABLE "Actividad" ALTER COLUMN "id_Actividad" SET DEFAULT nextval('actividad_id_actividad_seq'),
ADD CONSTRAINT "Actividad_pkey" PRIMARY KEY ("id_Actividad");
ALTER SEQUENCE actividad_id_actividad_seq OWNED BY "Actividad"."id_Actividad";

-- AlterTable
CREATE SEQUENCE alquiler_id_alquiler_seq;
ALTER TABLE "Alquiler" ALTER COLUMN "id_Alquiler" SET DEFAULT nextval('alquiler_id_alquiler_seq'),
ADD CONSTRAINT "Alquiler_pkey" PRIMARY KEY ("id_Alquiler");
ALTER SEQUENCE alquiler_id_alquiler_seq OWNED BY "Alquiler"."id_Alquiler";

-- AlterTable
CREATE SEQUENCE eventosnoticia_id_eventonoticia_seq;
ALTER TABLE "EventosNoticia" ALTER COLUMN "id_EventoNoticia" SET DEFAULT nextval('eventosnoticia_id_eventonoticia_seq'),
ADD CONSTRAINT "EventosNoticia_pkey" PRIMARY KEY ("id_EventoNoticia");
ALTER SEQUENCE eventosnoticia_id_eventonoticia_seq OWNED BY "EventosNoticia"."id_EventoNoticia";

-- AlterTable
CREATE SEQUENCE restaurant_id_restaurant_seq;
ALTER TABLE "Restaurant" ALTER COLUMN "id_Restaurant" SET DEFAULT nextval('restaurant_id_restaurant_seq'),
ADD CONSTRAINT "Restaurant_pkey" PRIMARY KEY ("id_Restaurant");
ALTER SEQUENCE restaurant_id_restaurant_seq OWNED BY "Restaurant"."id_Restaurant";

-- AlterTable
CREATE SEQUENCE servicios_id_servicio_seq;
ALTER TABLE "Servicios" ALTER COLUMN "id_Servicio" SET DEFAULT nextval('servicios_id_servicio_seq'),
ADD CONSTRAINT "Servicios_pkey" PRIMARY KEY ("id_Servicio");
ALTER SEQUENCE servicios_id_servicio_seq OWNED BY "Servicios"."id_Servicio";
