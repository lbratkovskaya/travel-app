import React from 'react';
import { useParams } from 'react-router-dom';
import {
  MapContainer, Marker, Polyline, Popup, TileLayer,
} from 'react-leaflet';
import { LatLngExpression } from 'leaflet';
import rootConnector, { rootProps } from '../../store/rootConnector';
import './Map.scss';
import { URLParamTypes } from '../../types';
import mapURLs from './mapURLs.json';
import borders from './countryBorders';

const Map: React.FC<rootProps> = (props: rootProps) => {
  const { countries, lang } = props;
  const { countryId } = useParams<URLParamTypes>();
  const { capitalLatLng } = countries.find((el) => el.id === countryId)!;

  const border = borders[countryId] as LatLngExpression[] || [[0, 0]];

  return (
    <MapContainer
      key={lang}
      className="MapContainer"
      center={capitalLatLng}
      zoom={3}
      scrollWheelZoom
    >
      <TileLayer
        url={mapURLs[lang!]}
      />
      <Polyline pathOptions={{ color: 'green' }} positions={border} />
      <Marker position={capitalLatLng}>
        <Popup>
          Capital name will be here
        </Popup>
      </Marker>
    </MapContainer>
  );
};

export default rootConnector(Map);
