import "leaflet/dist/leaflet.css";
import { MapContainer, TileLayer, Marker, useMap } from "react-leaflet";
import L from "leaflet";
import markerIcon2x from "leaflet/dist/images/marker-icon-2x.png";
import markerIcon from "leaflet/dist/images/marker-icon.png";
import markerShadow from "leaflet/dist/images/marker-shadow.png";

delete L.Icon.Default.prototype._getIconUrl;
L.Icon.Default.mergeOptions({
  iconUrl: markerIcon.src,
  iconRetinaUrl: markerIcon2x.src,
  shadowUrl: markerShadow.src,
});

export function ChangeView({ coords }) {
  const map = useMap();
  map.setView(coords, 5);
  return null;
}

export default function Map({ selectedCountry }) {
  const center = selectedCountry && selectedCountry.latlag || [20,77];
  return (
    <MapContainer
      center={center || [51, -0.09]}
      zoom={center ? 2 : 1}
      style={{ height: "45vh" }}
      scrollWheelZoom={false}
      className="h-[40vh] rounded-lg"
    >
      <TileLayer
        attribution='&copy; <a href="http://osm.org/copyright">OpenStreetMap</a> contributors'
        url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
      />
      {center[0] && center[1] && (
        <Marker position={[center[0], center[1]]} alt={selectedCountry && selectedCountry.label || "India"}/>
      )}
      <ChangeView coords={center} />
    </MapContainer>
  );
}
