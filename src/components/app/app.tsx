/* eslint-disable arrow-body-style */
import { Route, BrowserRouter, Routes } from 'react-router-dom';
import { AppRoute, AuthorizationStatus } from '../../const';
import { SingleCard } from '../../lib/types.ts/card';
import { Favorite } from '../../lib/types.ts/favorite';
import { City } from '../../lib/types.ts/city';
import { Point } from '../../lib/types.ts/point';
import { SingleReview } from '../../lib/types.ts/review';
import Main from '../../pages/main/main';
import Login from '../../pages/login/login';
import Favorites from '../../pages/favorites/favorites';
import Offer from '../../pages/offer/offer';
import NotFound from '../../pages/not-found/not-found';
import PrivateRoute from '../private-route/private-route';

type Props = {
  offers: SingleCard[];
  neighbourhoodOffers: SingleCard[];
  favorites: Favorite[];
  city: City;
  points: Point[];
  reviews: SingleReview[];
};

const App = ({
  offers,
  neighbourhoodOffers,
  favorites,
  city,
  points,
  reviews,
}: Props) => {
  return (
    <BrowserRouter>
      <Routes>
        <Route
          path={AppRoute.Main}
          element={<Main offers={offers} city={city} points={points} />}
        />
        <Route path={AppRoute.Login} element={<Login />} />
        <Route
          path={AppRoute.Favorites}
          element={
            <PrivateRoute authorizationStatus={AuthorizationStatus.NoAuth}>
              <Favorites favorites={favorites} />
            </PrivateRoute>
          }
        />
        <Route
          path={`${AppRoute.Offer}/:id`}
          element={
            <Offer
              offers={neighbourhoodOffers}
              reviews={reviews}
              city={city}
              points={points.slice(-3)}
            />
          }
        />
        <Route path="*" element={<NotFound />} />
      </Routes>
    </BrowserRouter>
  );
};

export default App;
