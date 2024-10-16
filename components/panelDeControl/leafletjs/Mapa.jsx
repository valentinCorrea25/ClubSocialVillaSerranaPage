import dynamic from 'next/dynamic';
import 'leaflet/dist/leaflet.css';
import { useEffect, useState } from 'react';
import L from 'leaflet';
import { getCoordsGoogleMaps } from '@/components/utils/ControlPublicaciones';
import Markerwhatever from './Marker';

// Solucionar el problema de los iconos de Leaflet
delete L.Icon.Default.prototype._getIconUrl;
L.Icon.Default.mergeOptions({
  iconRetinaUrl: 'https://unpkg.com/leaflet@1.7.1/dist/images/marker-icon-2x.png',
  iconUrl: 'https://unpkg.com/leaflet@1.7.1/dist/images/marker-icon.png',
  shadowUrl: 'https://unpkg.com/leaflet@1.7.1/dist/images/marker-shadow.png',
});

// Cargar dinámicamente los componentes de react-leaflet
const MapContainer = dynamic(() => import('react-leaflet').then(mod => mod.MapContainer), { ssr: false });
const TileLayer = dynamic(() => import('react-leaflet').then(mod => mod.TileLayer), { ssr: false });
const Marker = dynamic(() => import('react-leaflet').then(mod => mod.Marker), { ssr: false });
const Popup = dynamic(() => import('react-leaflet').then(mod => mod.Popup), { ssr: false });


export default function Mapa({ urlGoogle }) {
  const [position, setPosition] = useState(urlGoogle ? getCoordsGoogleMaps(urlGoogle) : [-34.322251, -54.986481]);  

  useEffect(() => {
    const coords = getCoordsGoogleMaps(urlGoogle);
    if (Array.isArray(coords) && coords.length === 2 && !isNaN(coords[0]) && !isNaN(coords[1])) {
      setPosition([parseFloat(coords[0]), parseFloat(coords[1])]);
      // MapFlyTo(position);
    } else {
      console.error('Coordenadas no válidas, usando posición por defecto.');
      setPosition([-34.322251, -54.986481]); // posición por defecto si no hay coordenadas válidas
    }
  }, [urlGoogle]);

  


  return (
    <MapContainer center={position} zoom={13} scrollWheelZoom={false} style={{ height: "300px", width: "100%" }}>
      <TileLayer
        url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
        attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
      />
     <Markerwhatever position={position}/>
    </MapContainer>
  );
}
