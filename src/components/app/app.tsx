// eslint-disable-next-line @typescript-eslint/ban-ts-comment
//@ts-nocheck баг с react router
import { Route, Routes } from 'react-router-dom';
import { AppRoute } from '../../const';
import { SingleOffer } from '../../lib/types/offer';
import { City } from '../../lib/types/city';
import { SingleReview } from '../../lib/types/review';
import { browserHistory } from '../../browser-history';
import Main from '../../pages/main/main';
import Login from '../../pages/login/login';
import Favorites from '../../pages/favorites/favorites';
import Offer from '../../pages/offer/offer';
import NotFound from '../../pages/not-found/not-found';
import PrivateRoute from '../private-route/private-route';
import HistoryRouter from '../history-router/history-router';

type Props = {
  favorites: SingleOffer[];
  reviews: SingleReview[];
  cityList: City[];
};

const App = ({ favorites, reviews, cityList }: Props) => (
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
          //@ts-expect-error происходит какое-то безумие
          <PrivateRoute>
            <Favorites favorites={favorites} />
          </PrivateRoute>
        }
      />
      <Route
        path={`${AppRoute.Offer}/:id`}
        element={<Offer reviews={reviews} />}
      />
      <Route path="*" element={<NotFound />} />
    </Routes>
  </HistoryRouter>
);

export default App;
