import { useSelector } from 'react-redux';
import { useAppDispatch } from '../../store';
import { RootState } from '../../lib/types/store';
import { selectCity } from '../../store/actions';
import clsx from 'clsx';

type Props = {
  city: string;
};

const City = ({ city }: Props) => {
  const activeCity = useSelector((state: RootState) => state.activeCity);

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
