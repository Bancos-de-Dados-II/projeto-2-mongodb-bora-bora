import React, {useEffect} from "react";
import { MapContainer, TileLayer, Marker, Popup, useMap} from 'react-leaflet';
import L from 'leaflet';

interface MyMapProps {
  coordinates: [number, number] | null;
}

const MyMap: React.FC<MyMapProps> = ({ coordinates }) => {
  
  const defaultPosition: [number, number] = [51.505, -0.09];

  const MapUpdater = () => {
    const map = useMap();

    if(!coordinates){
      map.locate().on("locationfound",function(e){
        map.setView(e.latlng);
      })
    }

    useEffect(() => {
      if (coordinates) {
        map.flyTo(coordinates, 13, { duration: 1.5 });
      }
    }, [coordinates, map]);

    return null;
  };

  return (
      <MapContainer center={coordinates || defaultPosition} zoom={13} style={{ height: '10rem', width: '100%' }}>
          <TileLayer url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png" />
          {coordinates && (
              <Marker position={coordinates} icon={new L.Icon.Default()}>
                  <Popup>Localização encontrada.</Popup>
              </Marker>
          )}
          <MapUpdater />
      </MapContainer>
  );
};

export default MyMap;
