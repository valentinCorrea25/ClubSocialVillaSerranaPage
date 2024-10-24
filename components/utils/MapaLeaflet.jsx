import React from "react";
import { MapContainer, Marker, Popup, TileLayer } from "react-leaflet";
import { getCoordsGoogleMaps } from "./ControlPublicaciones";

export default function MapaLeaflet({ ubicacion }) {
  const position = getCoordsGoogleMaps(ubicacion);

  return (
    <MapContainer
      center={position}
      zoom={13}
      scrollWheelZoom={false}
      style={{ height: "300px", width: "300px" }}
    >
      <TileLayer
        attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
        url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
      />
      <Marker position={position}>
        <Popup>
          A pretty CSS3 popup. <br /> Easily customizable.
        </Popup>
      </Marker>
    </MapContainer>
  );
}
