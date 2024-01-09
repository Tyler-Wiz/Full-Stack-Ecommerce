import { MapContainer, TileLayer, Marker } from "react-leaflet";
import "leaflet/dist/leaflet.css";
import { Icon } from "leaflet";

const customIcon = new Icon({
  iconUrl: "/img/client/map-pin.png",
  iconSize: [38, 38], // size of the icon
});

export default function MapComponent({ geoData }) {
  return (
    <MapContainer
      center={[geoData.lat, geoData.lng]}
      zoom={10}
      style={{ height: "50vh", width: "100%" }}>
      <TileLayer
        attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
        url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
      />
      {geoData.lat && geoData.lng && (
        <Marker position={[geoData.lat, geoData.lng]} icon={customIcon} />
      )}
    </MapContainer>
  );
}
