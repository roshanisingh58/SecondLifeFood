import { useEffect, useMemo, useState } from "react";
import { MapContainer, TileLayer, Marker, Popup } from "react-leaflet";
import L from "leaflet";

import markerIcon2x from "leaflet/dist/images/marker-icon-2x.png";
import markerIcon from "leaflet/dist/images/marker-icon.png";
import markerShadow from "leaflet/dist/images/marker-shadow.png";

delete L.Icon.Default.prototype._getIconUrl;
L.Icon.Default.mergeOptions({
  iconRetinaUrl: markerIcon2x,
  iconUrl: markerIcon,
  shadowUrl: markerShadow,
});

export default function LiveGpsMap() {
  const [pos, setPos] = useState(null);
  const [err, setErr] = useState("");

  useEffect(() => {
    if (!navigator.geolocation) {
      setErr("Geolocation not supported in this browser.");
      return;
    }

    const id = navigator.geolocation.watchPosition(
      (p) => {
        setErr("");
        setPos({
          lat: p.coords.latitude,
          lng: p.coords.longitude,
          accuracy: p.coords.accuracy,
        });
      },
      (e) => setErr(e.message || "Location error"),
      { enableHighAccuracy: true, timeout: 10000, maximumAge: 2000 }
    );

    return () => navigator.geolocation.clearWatch(id);
  }, []);

  const center = useMemo(
    () => (pos ? { lat: pos.lat, lng: pos.lng } : { lat: 19.076, lng: 72.8777 }),
    [pos]
  );

  return (
    <div style={{ height: 450, borderRadius: 12, overflow: "hidden" }}>
      {err ? <div style={{ padding: 12 }}>{err}</div> : null}

      <MapContainer center={center} zoom={pos ? 17 : 12} style={{ height: "100%", width: "100%" }}>
        <TileLayer
          attribution="&copy; OpenStreetMap contributors"
          url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
        />

        {pos ? (
          <Marker position={[pos.lat, pos.lng]}>
            <Popup>
              <div>
                <div><b>Live location</b></div>
                <div>Lat: {pos.lat.toFixed(6)}</div>
                <div>Lng: {pos.lng.toFixed(6)}</div>
                <div>Accuracy: {Math.round(pos.accuracy)} m</div>
              </div>
            </Popup>
          </Marker>
        ) : null}
      </MapContainer>
    </div>
  );
}