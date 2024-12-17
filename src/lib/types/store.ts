import { PlacesSortingName } from '../../const';
import { store } from '../../store';
import { City } from './city';
import { SingleOffer } from './offer';

export type StoreState = {
  activeCity: City;
  offerList: SingleOffer[];
  selectedOffer: SingleOffer | undefined;
  placesSorting: PlacesSortingName;
};

export type RootState = ReturnType<typeof store.getState>;

export type AppDispatch = typeof store.dispatch;
