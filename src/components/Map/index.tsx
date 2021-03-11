import React from 'react';
import { useParams } from 'react-router-dom';
import {
  MapContainer, Marker, Popup, TileLayer, useMap,
} from 'react-leaflet';
import Leaflet from 'leaflet';
import FullScreenIcon from '@material-ui/icons/FullscreenRounded';
import rootConnector, { rootProps } from '../../store/rootConnector';
import './Map.scss';
import { URLParamTypes } from '../../types';
import mapURLs from './mapURLs.json';
import borders from './borders.json';

const borderStyle = () => ({
  weight: 2,
  color: 'green',
  fillOpacity: 0,
  opacity: 0.6,
});

interface IBorder {
  id: string;
}

function CountryBorder(props: IBorder) {
  const map = useMap();
  const countryBorder = borders.features.filter((feature) => feature.id === props.id);

  Leaflet.geoJSON(countryBorder as any, { style: borderStyle }).addTo(map);

  return null;
}

const Map: React.FC<rootProps> = (props: rootProps) => {
  const { countries, lang } = props;
  const { countryId } = useParams<URLParamTypes>();
  const { capitalLatLng } = countries.find((el) => el.id === countryId)!;

  const handleFullScreen = () => {
    console.log('full screen on');
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
      <Marker position={capitalLatLng}>
        <Popup>
          Capital name will be here
        </Popup>
      </Marker>
    </MapContainer>
  );
};

export default rootConnector(Map);
