import { Favorite } from '../lib/types.ts/favorite';

export const FAVORITES: Favorite[] = [
  {
    city: 'Amsterdam',
    cards: [
      {
        id: 1,
        isPremium: true,
        imgPath: 'img/apartment-01.jpg',
        price: 120,
        inBookmarks: true,
        rating: 4,
        placeName: 'Beautiful &amp; luxurious apartment at great location',
        placeType: 'Apartment',
      },
      {
        id: 2,
        isPremium: false,
        imgPath: 'img/room.jpg',
        price: 80,
        inBookmarks: true,
        rating: 4,
        placeName: 'Wood and stone place',
        placeType: 'Private room',
      },
    ],
  },
  {
    city: 'Cologne',
    cards: [
      {
        id: 3,
        isPremium: false,
        imgPath: 'img/apartment-02.jpg',
        price: 132,
        inBookmarks: true,
        rating: 4,
        placeName: 'Canal View Prinsengracht',
        placeType: 'Apartment',
      },
      {
        id: 4,
        isPremium: true,
        imgPath: 'img/apartment-03.jpg',
        price: 180,
        inBookmarks: true,
        rating: 5,
        placeName: 'Nice, cozy, warm big bed apartment',
        placeType: 'Apartment',
      },
    ],
  },
];
