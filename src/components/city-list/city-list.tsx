import { memo } from 'react';
import City from '../city/city';

type Props = { cityList: string[] };

const CityList = ({ cityList }: Props) => (
  <ul className="locations__list tabs__list">
    {cityList.map((city) => (
      <City key={city} city={city} />
    ))}
  </ul>
);

export default memo(CityList);
