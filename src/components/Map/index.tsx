import React from 'react';
import { useParams } from 'react-router-dom';
import {
  MapContainer, Marker, Popup, TileLayer, useMap,
} from 'react-leaflet';
import Leaflet from 'leaflet';
import icon from 'leaflet/dist/images/marker-icon.png';
import iconShadow from 'leaflet/dist/images/marker-shadow.png';
import FullScreenIcon from '@material-ui/icons/FullscreenRounded';
import rootConnector, { rootProps } from '../../store/rootConnector';
import { Country, URLParamTypes } from '../../types';
import mapURLs from './mapURLs.json';
import borders from './borders.json';
import 'leaflet/dist/leaflet.css';
import './Map.scss';

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

interface IBorder {
  id: string;
}

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
  const { capitalLatLng } = currentCountry;
  let capital = null;

  switch (lang) {
    case 'de':
      capital = currentCountry.capitalDE;
      break;
    case 'ru':
      capital = currentCountry.capitalRU;
      break;
    default: capital = currentCountry.capitalEN;
  }

  const handleFullScreen = () => {
  };

  return (
    <MapContainer
      key={lang}
      className="MapContainer"
      center={capitalLatLng}
      zoom={4}
      scrollWheelZoom
      maxBounds={[[-90, -220], [90, 220]]}
      minZoom={1}
    >
      <FullScreenIcon
        className="fullscreen-icon"
        onClick={handleFullScreen}
      />
      <CountryBorder id={countryId} />
      <TileLayer
        url={mapURLs[lang!]}
      />
      {capitalLatLng
      && (
      <Marker position={capitalLatLng}>
        <Popup>
          {capital}
        </Popup>
      </Marker>
      )}
    </MapContainer>
  );
};

export default rootConnector(Map);
