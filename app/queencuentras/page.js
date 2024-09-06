'use client';
import React from 'react';
import ImageComponent from '@/components/QueEncuentras/ImageComponent';
import TextComponent from '@/components/QueEncuentras/TextComponent';

const QueEncuentras = () => {
  const categories = [
    {
      name: 'Hospedaje en Armonía con la Naturaleza',
      description: 'Los alojamientos en Villa Serrana están diseñados para integrarse perfectamente con el entorno natural. Aquí, las opciones van desde acogedoras cabañas de madera hasta elegantes hosterías que respetan la arquitectura tradicional. Muchos de estos lugares de hospedaje ofrecen vistas espectaculares a los cerros y valles, permitiendo a los visitantes despertar con el canto de las aves y disfrutar de la paz que caracteriza a la villa. La conexión con la naturaleza es parte esencial de la experiencia, con jardines autóctonos y terrazas que invitan al descanso y la contemplación.',
      image: '/images/banneralojamiento.jpg',
      link: '/ListaAlojamiento'
    },
    {
      name: 'Gastronomía Local en Villa Serrana',
      description: 'En Villa Serrana, la experiencia culinaria está íntimamente ligada a su entorno natural. Los restaurantes de la zona ofrecen una cocina que refleja la riqueza del paisaje, utilizando ingredientes frescos y locales para crear platos que deleitan a los visitantes. En un entorno sereno, los comensales pueden disfrutar de una comida que combina sabores tradicionales con toques contemporáneos, todo mientras se sumergen en la tranquilidad de los cerros y la vegetación autóctona. Ya sea que busques un almuerzo al aire libre rodeado de naturaleza o una cena acogedora junto a una chimenea, Villa Serrana tiene opciones gastronómicas que se adaptan a cada gusto.',
      image: '/images/bannerrestaurante.jpg',
      link: '/ListaRestaurantes'
    },
    {
      name: 'Explora la Naturaleza en Villa Serrana',
      description: 'Villa Serrana es un destino ideal para quienes buscan conectarse con la naturaleza. Las actividades al aire libre incluyen caminatas por los cerros Guazubirá y Bella Vista, paseos alrededor del lago Enrique Stewart Vargas, y exploración de los valles y arroyos que rodean la villa. Los visitantes pueden disfrutar de la observación de aves, la fotografía paisajística, y el simple placer de caminar por senderos que se entrelazan con la flora autóctona. La falta de urbanización masiva ha permitido que Villa Serrana conserve su pureza natural, ofreciendo un refugio de tranquilidad y belleza.',
      image: '/images/banneractividad.jpg',
      link: '/ListaActividades'
    },
    {
      name: 'Eventos y Noticias',
      description: 'El Club Social y Deportivo de Villa Serrana es más que una simple institución; es el corazón de la comunidad, un lugar donde vecinos y visitantes se reúnen para participar en actividades que fomentan la cohesión social, el desarrollo cultural y el bienestar físico. A lo largo del año, el club organiza una variedad de eventos que van desde actividades deportivas y recreativas hasta encuentros culturales y sociales. No te pierdas la oportunidad de participar y ser parte activa de la construcción de un espacio que busca mejorar la calidad de vida en Villa Serrana.',
      image: '/images/bannerevento.jpg',
      link: '/ListaEventosNoticias'
    },
    {
      name: 'Servicios para Socios y No Socios',
      description: 'El Club Social y Deportivo Villa Serrana ofrece una gama de servicios diseñados para mejorar la vida en Villa Serrana, tanto para socios como para no socios. Los miembros del club tienen acceso a beneficios exclusivos, que incluyen descuentos en establecimientos locales, servicios personalizados como mantenimiento del hogar, asesoramiento legal y técnico, y facilidades para la organización de eventos privados en los espacios del club.',
      image: '/images/bannerservicio.jpg',
      link: '/ListaServicios'
    }
  ];

  return (
    <div style={{ padding: '40px 20px' }} className='max-w-screen-xl m-auto'>
      <h1 style={{ textAlign: 'center', fontSize: '2.5rem', marginBottom: '20px', color: 'var(--azul)' }}>
        ¿Qué Encuentras Aquí?
      </h1>
      <p style={{ textAlign: 'center', fontSize: '1.25rem', marginBottom: '40px', color: '#555' }}>
        Descubre todas las opciones que tenemos para ofrecerte, desde cómodos alojamientos hasta emocionantes actividades.
      </p>
      {categories.map((category, index) => (
        <div
          key={category.name}
          style={{ marginBottom: '40px', display: 'flex', flexDirection: index % 2 === 0 ? 'row' : 'row-reverse', alignItems: 'center', gap: '20px' }}
        >
          <a href={category.link} style={{ textDecoration: 'none', color: 'inherit' }}>
            <ImageComponent src={category.image} alt={category.name} />
          </a>
          <TextComponent>
            <h2 style={{ fontWeight: 'bold' }}>{category.name}</h2>
            <p>{category.description}</p>
          </TextComponent>
        </div>
      ))}
    </div>
  );
};

export default QueEncuentras;
