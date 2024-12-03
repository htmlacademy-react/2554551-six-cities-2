import { CardType } from './lib/types.ts/card';

export enum AppRoute {
  Main = '/',
  Login = '/login',
  Favorites = '/favorites',
  Offer = '/offer',
}

export enum AuthorizationStatus {
  Auth = 'AUTH',
  NoAuth = 'NO_AUTH',
  Unknown = 'UNKNOWN',
}

export const URL_MARKER_DEFAULT =
  'https://assets.htmlacademy.ru/content/intensive/javascript-1/demo/interactive-map/pin.svg';

export const URL_MARKER_CURRENT =
  'https://assets.htmlacademy.ru/content/intensive/javascript-1/demo/interactive-map/main-pin.svg';

export const CARD_OPTIONS: Record<
  CardType,
  Record<'list' | 'card' | 'img', string>
> = {
  offer: {
    list: 'cities__places-list tabs__content',
    card: 'cities__card',
    img: 'cities__image-wrapper',
  },
  near: {
    list: 'near-places__list',
    card: 'near-places__card',
    img: 'near-places__image-wrapper',
  },
};
