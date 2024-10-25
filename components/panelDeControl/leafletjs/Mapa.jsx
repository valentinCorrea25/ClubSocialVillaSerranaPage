import dynamic from 'next/dynamic';
import { useEffect, useState, useMemo } from 'react';
import L from 'leaflet';
import 'leaflet/dist/leaflet.css';
import { getCoordsGoogleMaps } from '@/components/utils/ControlPublicaciones';

// Configure default Leaflet icons
const configureLeafletIcons = () => {
  delete L.Icon.Default.prototype._getIconUrl;
  L.Icon.Default.mergeOptions({
    iconRetinaUrl: 'https://unpkg.com/leaflet@1.7.1/dist/images/marker-icon-2x.png',
    iconUrl: 'https://unpkg.com/leaflet@1.7.1/dist/images/marker-icon.png',
    shadowUrl: 'https://unpkg.com/leaflet@1.7.1/dist/images/marker-shadow.png',
  });
};

// Dynamically import react-leaflet components
const MapContainer = dynamic(
  () => import('react-leaflet').then(mod => mod.MapContainer),
  { ssr: false }
);
const TileLayer = dynamic(
  () => import('react-leaflet').then(mod => mod.TileLayer),
  { ssr: false }
);
const MarkerWrapper = dynamic(
  () => import('./Marker'),
  { ssr: false }
);

const DEFAULT_POSITION = [-34.322251, -54.986481];

export default function Mapa({ urlGoogle }) {
  const [mapReady, setMapReady] = useState(false);
  const [position, setPosition] = useState(DEFAULT_POSITION);
  const [error, setError] = useState(null);

  // Configure Leaflet icons once when component mounts
  useEffect(() => {
    configureLeafletIcons();
  }, []);

  // Handle position updates when urlGoogle changes
  useEffect(() => {
    if (!urlGoogle) {
      setPosition(DEFAULT_POSITION);
      return;
    }

    try {
      const coords = getCoordsGoogleMaps(urlGoogle);
      if (Array.isArray(coords) && 
          coords.length === 2 && 
          !isNaN(coords[0]) && 
          !isNaN(coords[1])) {
        setPosition([parseFloat(coords[0]), parseFloat(coords[1])]);
      } else {
        console.warn('Invalid coordinates, using default position');
        setPosition(DEFAULT_POSITION);
      }
    } catch (err) {
      console.error('Error processing coordinates:', err);
      setError('Failed to process coordinates');
      setPosition(DEFAULT_POSITION);
    }
  }, [urlGoogle]);

  // Ensure map is only rendered client-side
  useEffect(() => {
    setMapReady(true);
  }, []);

  const mapStyles = useMemo(() => ({
    height: "300px",
    width: "100%",
    zIndex: 1
  }), []);

  if (!mapReady) {
    return <div style={mapStyles}>Loading map...</div>;
  }

  if (error) {
    return <div style={mapStyles}>Error: {error}</div>;
  }

  return (
    <div style={{ position: 'relative' }}>
      <MapContainer 
        center={position} 
        zoom={13} 
        scrollWheelZoom={false} 
        style={mapStyles}
        key={`map-${position.join('-')}`}
      >
        <TileLayer
          url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
          attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
        />
        <MarkerWrapper position={position} />
      </MapContainer>
    </div>
  );
}