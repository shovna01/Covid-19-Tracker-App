import React from "react";
import { Map as LeafletMap, TileLayer, //useMap
} from "react-leaflet";
import "./Map.css";
import { showDataOnMap } from "./util";

function Map({ countries, casesType, center, zoom }) {
  function ChangeView({ center, zoom }) {
    // const map = useMap();
    // map.setView(center, zoom);
    return null;
  }

  return (
    <LeafletMap
      casesType={casesType}
      className="map"
      center={center}
      zoom={zoom}
      scrollWheelZoom={false}
    >
      <ChangeView center={center} zoom={zoom} />
      <TileLayer
        attribution='&copy; <a href="http://osm.org/copyright">OpenStreetMap</a> contributors'
        url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
      />
      {/* Loop through countries and draw circles, varying sizes */}
      {showDataOnMap(countries, casesType)}
    </LeafletMap>
  );
}

export default Map;