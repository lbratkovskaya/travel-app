import React from 'react';
import { useParams } from 'react-router-dom';
import {
  MapContainer, Marker, Popup, TileLayer, useMap,
} from 'react-leaflet';
import Leaflet from 'leaflet';
import 'leaflet.fullscreen';
import screenfull from 'screenfull';
import icon from 'leaflet/dist/images/marker-icon.png';
import iconShadow from 'leaflet/dist/images/marker-shadow.png';
import rootConnector, { rootProps } from '../../store/rootConnector';
import { Country, URLParamTypes } from '../../types';
import { IBorder } from './IBorder';
import mapURLs from './mapURLs.json';
import borders from './borders.json';
import 'leaflet/dist/leaflet.css';
import './Map.scss';
import getCapitalTranslated from '../../controller/utils';

const borderStyle = () => ({
  weight: 2,
  color: 'green',
  fillOpacity: 0,
  opacity: 0.6,
});

const DefaultIcon = Leaflet.icon({
  iconUrl: icon,
  shadowUrl: iconShadow,
  iconAnchor: [12, 41],
});

Leaflet.Marker.prototype.options.icon = DefaultIcon;
window.screenfull = screenfull;

function CountryBorder(props: IBorder) {
  const map = useMap();
  const countryBorder = borders.features.filter((feature) => feature.id === props.id);

  Leaflet.geoJSON(countryBorder as any, { style: borderStyle }).addTo(map);
  setTimeout(() => map.invalidateSize(), 0);

  return null;
}

const Map: React.FC<rootProps> = (props: rootProps) => {
  const { countries, lang } = props;
  const { countryId } = useParams<URLParamTypes>();
  const currentCountry: Country = countries?.find((el) => el.id === countryId)!;
  const capital = getCapitalTranslated(currentCountry, lang);
  const capitalLatLng = countries?.find((el) => el.id === countryId)?.capitalLatLng;

  const handleFullScreen = () => {
  };

  return (
    <>
      {capitalLatLng
    && (
    <MapContainer
      fullscreenControl
      fullscreenControlOptions={{
        position: 'topleft',
        forceSeparateButton: true,
      }}
      key={lang}
      className="MapContainer"
      center={capitalLatLng}
      zoom={4}
      scrollWheelZoom
      maxBounds={[[-90, -220], [90, 220]]}
      minZoom={1}
    >
      <CountryBorder id={countryId} />
      <TileLayer
        url={mapURLs[lang!]}
      />
      <Marker position={capitalLatLng}>
        <Popup>
          {capital}
        </Popup>
      </Marker>
    </MapContainer>
    )}
    </>
  );
};

export default rootConnector(Map);
