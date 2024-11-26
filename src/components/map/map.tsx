import { useEffect, useRef } from 'react';
import { useMap } from '../../hooks/use-map';
import { URL_MARKER_CURRENT, URL_MARKER_DEFAULT } from '../../const';
import { Icon, Marker, layerGroup } from 'leaflet';
import { City } from '../../lib/types.ts/city';
import { Point } from '../../lib/types.ts/point';
import styles from './map.module.css';
import 'leaflet/dist/leaflet.css';

type Props = { city: City; points: Point[]; selectedPoint: Point | undefined };

const defaultCustomIcon = new Icon({
  iconUrl: URL_MARKER_DEFAULT,
  iconSize: [40, 40],
  iconAnchor: [20, 40],
});

const currentCustomIcon = new Icon({
  iconUrl: URL_MARKER_CURRENT,
  iconSize: [40, 40],
  iconAnchor: [20, 40],
});

const Map = ({ city, points, selectedPoint }: Props) => {
  const mapRef = useRef<HTMLDivElement | null>(null);
  const map = useMap(mapRef, city);

  useEffect(() => {
    if (map) {
      const markerLayer = layerGroup().addTo(map);

      points.forEach((point) => {
        const marker = new Marker({ lat: point.lat, lng: point.lng });

        marker
          .setIcon(
            selectedPoint !== undefined && point.title === selectedPoint.title
              ? currentCustomIcon
              : defaultCustomIcon
          )
          .addTo(markerLayer);
      });

      return () => {
        map.removeLayer(markerLayer);
      };
    }
  }, [map, points, selectedPoint]);

  return (
    <div
      className={styles.map}
      style={{ width: '100%', alignSelf: 'stretch' }}
      ref={mapRef}
    >
      {}
    </div>
  );
};

export default Map;
