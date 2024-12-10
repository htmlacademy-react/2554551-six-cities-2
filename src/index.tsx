import React from 'react';
import ReactDOM from 'react-dom/client';
import App from './components/app/app';
import { FAVORITES } from './mocks/favorites';
import { REVIEWS } from './mocks/reviews';
import { CITIES } from './const';
import { Provider } from 'react-redux';
import { store } from './store';

const root = ReactDOM.createRoot(
  document.getElementById('root') as HTMLElement
);

root.render(
  <React.StrictMode>
    <Provider store={store}>
      <App favorites={FAVORITES} reviews={REVIEWS} cityList={CITIES} />
    </Provider>
  </React.StrictMode>
);
