import { Route, Routes } from 'react-router-dom';
import { AppRoute } from '../../const';
import { City } from '../../lib/types/city';
import { browserHistory } from '../../browser-history';
import Login from '../../pages/login/login';
import Favorites from '../../pages/favorites/favorites';
import Offer from '../../pages/offer/offer';
import NotFound from '../../pages/not-found/not-found';
import PrivateRoute from '../private-route/private-route';
import HistoryRouter from '../history-router/history-router';
import Main from '../../pages/main/main';

type Props = {
  cityList: City[];
};

const App = ({ cityList }: Props) => (
  <HistoryRouter history={browserHistory}>
    <Routes>
      <Route
        path={AppRoute.Main}
        element={<Main cityList={cityList.map((city) => city.name)} />}
      />
      <Route path={AppRoute.Login} element={<Login />} />
      <Route
        path={AppRoute.Favorites}
        element={
          // @ts-expect-error происходит какое-то безумие (не проходит сборка)
          <PrivateRoute>
            <Favorites />
          </PrivateRoute>
        }
      />
      <Route path={`${AppRoute.Offer}/:id`} element={<Offer />} />
      <Route path="*" element={<NotFound />} />
    </Routes>
  </HistoryRouter>
);

export default App;
