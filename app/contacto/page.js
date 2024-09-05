import React from 'react'
import { FaInstagram, FaFacebook} from 'react-icons/fa';

export default function Contacto() {
  return (
    <div>
      {/* Sección de la imagen de fondo */}
      <div style={{ 
          backgroundImage: "url('https://concepto.de/wp-content/uploads/2019/12/paisaje-rural-caracteristicas-e1576119380947.jpg'", 
          backgroundSize: 'cover', 
          backgroundPosition: 'center', 
          padding: '60px 20px', 
          textAlign: 'center'  
        }}>
        <h1>Contáctenos</h1>
      </div>

      {/* Sección de los íconos */}
      <div style={{ display: 'flex', justifyContent: 'space-around', padding: '20px', backgroundColor: '#ffffff' }}>
        <div style={{ textAlign: 'center' }}>
        <a href="https://www.instagram.com/club_villa_serrana/" target="_blank" rel="noopener noreferrer" style={{ margin: '0 15px' }}>
          <FaInstagram size={30} color="#034001" />
          <p>instagram</p>
        </a>
        </div>
        <div style={{ textAlign: 'center' }}>
        <a href="https://www.facebook.com/ClubVillaSerrana/" target="_blank" rel="noopener noreferrer" style={{ margin: '0 15px' }}>
          <FaFacebook size={30} color="#034001" />
          <p>facebook</p>
        </a>
        </div>
        <div style={{ textAlign: 'center' }}>
        <a href="tel:+59891776021" target="_blank" rel="noopener noreferrer" style={{ margin: '0 15px' }}>
          <FaInstagram size={30} color="#034001" />
          <p>Llamada</p>
        </a>
        </div>
        <div style={{ textAlign: 'center' }}>
        <a href="csydvillaserrana@gmail.com" target="_blank" rel="noopener noreferrer" style={{ margin: '0 15px' }}>
          <FaInstagram size={30} color="#034001" />
          <p>Correo</p>
        </a>
        </div>
      </div>
    </div>
  );
}
