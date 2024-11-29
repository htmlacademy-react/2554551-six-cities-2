import React from 'react';
import ReactDOM from 'react-dom/client';
import App from './components/app/app';
import { NEIGHBOURHOOD_OFFERS, OFFERS } from './mocks/offers';
import { FAVORITES } from './mocks/favorites';
import { CITY } from './mocks/city';
import { POINTS } from './mocks/points';
import { REVIEWS } from './mocks/reviews';

const root = ReactDOM.createRoot(
  document.getElementById('root') as HTMLElement
);

root.render(
  <React.StrictMode>
    <App
      offers={OFFERS}
      neighbourhoodOffers={NEIGHBOURHOOD_OFFERS}
      favorites={FAVORITES}
      city={CITY}
      points={POINTS}
      reviews={REVIEWS}
    />
  </React.StrictMode>
);
