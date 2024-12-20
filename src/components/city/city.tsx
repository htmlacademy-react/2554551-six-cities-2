import { useSelector } from 'react-redux';
import { useAppDispatch } from '../../store';
import { selectActiveCity } from '../../store/city/city.selectors';
import { selectCity } from '../../store/city/citySlice';
import clsx from 'clsx';

type Props = {
  city: string;
};

const City = ({ city }: Props) => {
  const activeCity = useSelector(selectActiveCity);

  const dispatch = useAppDispatch();

  return (
    <li className="locations__item" onClick={() => dispatch(selectCity(city))}>
      <a
        className={clsx(
          'locations__item-link',
          'tabs__item',
          activeCity.name === city && 'tabs__item--active'
        )}
        href="#"
      >
        <span>{city}</span>
      </a>
    </li>
  );
};

export default City;
