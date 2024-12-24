import { useEffect, useRef } from 'react';
import { useSelector } from 'react-redux';
import { useLocation } from 'react-router-dom';
import { useMap } from '../../hooks/use-map';
import { selectSelectedOffer } from '../../store/offers/offers.selectors';
import { AppRoute, URL_MARKER_CURRENT, URL_MARKER_DEFAULT } from '../../const';
import { Icon, Marker, layerGroup } from 'leaflet';
import { City } from '../../lib/types/city';
import { Location } from '../../lib/types/location';
import styles from './map.module.css';
import 'leaflet/dist/leaflet.css';

type Props = {
  city: City;
  locations: Location[];
};

const defaultCustomIcon = new Icon({
  iconUrl: URL_MARKER_DEFAULT,
  iconSize: [30, 40],
  iconAnchor: [20, 40],
});

const currentCustomIcon = new Icon({
  iconUrl: URL_MARKER_CURRENT,
  iconSize: [30, 40],
  iconAnchor: [20, 40],
});

const Map = ({ city, locations }: Props) => {
  const mapRef = useRef<HTMLDivElement | null>(null);
  const map = useMap(mapRef, city);
  const selectedLocation = useSelector(selectSelectedOffer)?.location;
  const path = useLocation();

  useEffect(() => {
    if (map) {
      const markerLayer = layerGroup().addTo(map);

      locations.forEach((location) => {
        const marker = new Marker({
          lat: location.latitude,
          lng: location.longitude,
        });

        marker
          .setIcon(
            selectedLocation !== undefined &&
              path.pathname === AppRoute.Main &&
              location.latitude === selectedLocation.latitude &&
              location.longitude === selectedLocation.longitude
              ? currentCustomIcon
              : defaultCustomIcon
          )
          .addTo(markerLayer);
      });

      map.setView({
        lat: city.location.latitude,
        lng: city.location.longitude,
      });

      return () => {
        map.removeLayer(markerLayer);
      };
    }
  }, [map, locations, city, selectedLocation]);

  return <div className={styles.map} ref={mapRef} />;
};

export default Map;
