import React from "react";
import fotoClub from "@/public/images/sobreElClub.jpg";
import fotoHistoria from "@/public/images/villaserrana.jpg";
import Image from "next/image";

export function SobreElCLub() {
  return (
    <div className="flex justify-center items-center p-4 ">
      <div className="bg-white rounded-lg shadow-lg p-8 max-w-screen-xl">
        <div className="md:float-right md:ml-8 md:mb-4 mb-8 flex justify-center md:block">
          <Image
            src='https://res.cloudinary.com/dvzf7szuo/image/upload/v1732046930/WhatsApp_Image_2024-11-19_at_16.57.04_1_pib70r.jpg'
            alt="Club Historia"
            className="rounded-lg shadow-lg"
            width={300}
            height={400}
          />
        </div>
        <h1 className="text-2xl font-bold mb-4 text-center">
          HISTORIA DEL CLUB
        </h1>
        <p className="text-gray-700 mb-4 text-justify">
          En el año 2019, un grupo de vecinos nos comenzamos a juntar con el fin
          de crear un Club Social y Deportivo. Luego de varias reuniones y
          eventos, donde participaron una gran cantidad de vecinos, tomamos la
          decisión de hacerlo realidad. Fue así que, a mediados de 2020,
          obtuvimos la personería jurídica con más de 30 socios fundadores.
        </p>
        <p className="text-gray-700 mb-4 text-justify">
          Debido al Covid-19, nos hemos visto imposibilitados de realizar
          actividades. Tenemos, desde fines de 2019, presentado en la IDL un
          expediente, solicitando un predio para llevar adelante el sueño de
          tener un espacio de encuentro y esparcimiento para la comunidad,
          residente y no residente.
        </p>
        <p className="text-gray-700 mb-4 text-justify">
          Observando que los plazos de los entes públicos no son los mismos que
          las necesidades de la comunidad, hemos decidido lanzar una campaña de
          socios para obtener fondos mensuales que nos permitan arrendar, en una
          primera instancia, alguna propiedad dentro de Villa Serrana para
          llevar a cabo nuestro primer objetivo: tener un lugar común para todos
          los vecinos donde podamos llevar a cabo actividades sociales,
          culturales y deportivas.
        </p>
        <p className="text-gray-700 text-justify">
          Por este motivo, los invitamos a todos, residentes y no residentes, a
          ser parte y hacerse socios del Club Social y Deportivo Villa Serrana.
        </p>
      </div>
    </div>
  );
}

export function Sobrevillaserrana() {
  return (
    <div className="flex justify-center items-center pb-10 p-4">
      <div className="bg-white rounded-lg shadow-lg p-8 max-w-screen-xl">
        <div className="md:float-right md:ml-8 md:mb-4 mb-8 flex justify-center md:block">
          <Image
            src={fotoHistoria}
            alt="Club Historia"
            className="rounded-lg shadow-lg"
            width={300}
            height={400}
          />
        </div>
        <h1 className="text-2xl font-bold mb-4 text-center">
          HISTORIA DE VILLA SERRANA
        </h1>
        <p className="text-gray-700 mb-4 text-justify">
          Villa Serrana es un pintoresco poblado ubicado en el departamento de
          Lavalleja, Uruguay, a unos 25 kilómetros al noreste de Minas. Fue
          fundada en 1946 como una villa de descanso de estilo europeo.
        </p>
        <p className="text-gray-700 mb-4 text-justify">
          La idea de crear Villa Serrana surgió en 1945, cuando se constituyó la
          sociedad Villa Serrana S.A. con el objetivo de desarrollar villas
          residenciales en un entorno natural panorámico. El arquitecto Julio
          Vilamajó, junto con otros colegas, fue el encargado de diseñar la
          villa, integrando la arquitectura con los materiales regionales como
          la piedra, la madera y la paja.
        </p>
        <p className="text-gray-700 mb-4 text-justify">
          El lugar se caracteriza por su paisaje natural, con cerros como el
          Guazubirá y Bella Vista, y una vegetación diversa. La villa fue
          concebida para mantenerse alejada del desarrollo urbanístico típico de
          las grandes ciudades, conservando su esencia natural y tranquila.
        </p>
        <p className="text-gray-700 text-justify">
          Hoy en día, Villa Serrana es un destino turístico que ofrece
          actividades como senderismo y observación de la naturaleza,
          permitiendo a los visitantes desconectar del ritmo agitado de la
          ciudad y disfrutar de un entorno sereno y natural.
        </p>
      </div>
    </div>
  );
}