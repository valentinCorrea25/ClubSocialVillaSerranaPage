import React, { useEffect } from "react";
import { Marker, useMap } from "react-leaflet";

export default function Markerwhatever({ position }) {
  const map = useMap();

  useEffect(() => {
    if(position[0] != 34.322251 && position[1] != -54.986481){
        map.flyTo(position, 15);
    }
  }, [position, map]);

  return (
    <Marker position={position} />
  );
}
