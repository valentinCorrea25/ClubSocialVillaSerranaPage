import React, { useEffect } from 'react';

 const BuscadorMapa = () => {
  useEffect(() => {
    const initMap = async () => {
      await customElements.whenDefined('gmp-map');

      const map = document.querySelector("gmp-map");
      const marker = document.getElementById("marker");
      const strictBoundsInputElement = document.getElementById("use-strict-bounds");
      const placePicker = document.getElementById("place-picker");
      const infowindowContent = document.getElementById("infowindow-content");
      const infowindow = new window.google.maps.InfoWindow();

      map.innerMap.setOptions({ mapTypeControl: false });
      infowindow.setContent(infowindowContent);

      placePicker.addEventListener('gmpx-placechange', () => {
        const place = placePicker.value;

        if (!place.location) {
          window.alert(`No details available for input: '${place.name}'`);
          infowindow.close();
          marker.position = null;
          return;
        }

        if (place.viewport) {
          map.innerMap.fitBounds(place.viewport);
        } else {
          map.center = place.location;
          map.zoom = 17;
        }

        marker.position = place.location;
        infowindowContent.children["place-name"].textContent = place.displayName;
        infowindowContent.children["place-address"].textContent = place.formattedAddress;
        infowindow.open(map.innerMap, marker);
      });

      const setupClickListener = (id, type) => {
        const radioButton = document.getElementById(id);
        radioButton.addEventListener("click", () => {
          placePicker.type = type;
        });
      };

      setupClickListener("changetype-all", "");
      setupClickListener("changetype-address", "address");
      setupClickListener("changetype-establishment", "establishment");
      setupClickListener("changetype-geocode", "geocode");
      setupClickListener("changetype-cities", "(cities)");
      setupClickListener("changetype-regions", "(regions)");

      strictBoundsInputElement.addEventListener("change", () => {
        placePicker.strictBounds = strictBoundsInputElement.checked;
      });
    };

    document.addEventListener('DOMContentLoaded', initMap);

    return () => {
      document.removeEventListener('DOMContentLoaded', initMap);
    };
  }, []);

  return (
    <div>
      <script
        type="module"
        src="https://unpkg.com/@googlemaps/extended-component-library@0.6"
      ></script>
      <gmpx-api-loader
        key=""
        solution-channel="GMP_CCS_autocomplete_v4"
      ></gmpx-api-loader>
      <gmp-map
        id="map"
        center="40.749933,-73.98633"
        zoom="13"
        // map-id="DEMO_MAP_ID"
      >
        <div slot="control-block-start-inline-start" className="pac-card" id="pac-card">
          <div>
            <div id="title">Autocomplete search</div>
            <div id="type-selector" className="pac-controls">
              <input type="radio" name="type" id="changetype-all" defaultChecked />
              <label htmlFor="changetype-all">All</label>

              <input type="radio" name="type" id="changetype-establishment" />
              <label htmlFor="changetype-establishment">establishment</label>

              <input type="radio" name="type" id="changetype-address" />
              <label htmlFor="changetype-address">address</label>

              <input type="radio" name="type" id="changetype-geocode" />
              <label htmlFor="changetype-geocode">geocode</label>

              <input type="radio" name="type" id="changetype-cities" />
              <label htmlFor="changetype-cities">(cities)</label>

              <input type="radio" name="type" id="changetype-regions" />
              <label htmlFor="changetype-regions">(regions)</label>
            </div>
            <br />
            <div id="strict-bounds-selector" className="pac-controls">
              <input type="checkbox" id="use-strict-bounds" />
              <label htmlFor="use-strict-bounds">Restrict to map viewport</label>
            </div>
          </div>
          <gmpx-place-picker id="place-picker" for-map="map"></gmpx-place-picker>
        </div>
        <gmp-advanced-marker id="marker"></gmp-advanced-marker>
      </gmp-map>
      <div id="infowindow-content">
        <span id="place-name" className="title" style={{ fontWeight: 'bold' }}></span>
        <br />
        <span id="place-address"></span>
      </div>
    </div>
  );
};

export default BuscadorMapa;
